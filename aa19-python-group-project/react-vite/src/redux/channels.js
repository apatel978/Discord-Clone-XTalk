import { csrfFetch } from "./csrf";
const GET_ALL_CHANNELS = "channels/getChannels";
const GET_CHANNELS_MESSAGES = "channels/getChannelsMessages"

const getAllChannels = (servers) => ({
  type: GET_ALL_CHANNELS,
  payload: servers,
});

const getChannelMessages = (channelInfo, channelId) => ({
  type: GET_CHANNELS_MESSAGES,
  payload: {channelInfo, channelId}
})

export const thunkGetAllChannels = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}/channels`);
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    if (data.errors) {
      return;
    }
    dispatch(getAllChannels(data));
  }
};

export const thunkGetAChannelsMessages = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}/messages`);
  if (res.ok) {
    const data = await res.json()

    if (data.errors) {
      return;
    }
    dispatch(getChannelMessages(data, channelId));
  }
}

const initialState = {};

function channelsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CHANNELS: {
          let nextState = {};
            action.payload.Channels.forEach((value) => {
                  nextState[value.id] = value;
            })
            return {
                ...state,
                ...nextState
            };
        }
        case GET_CHANNELS_MESSAGES: {
          console.log("STATE", state)
          let nextState = structuredClone(state);
          const {channelInfo, channelId} = action.payload;
          nextState[channelId] = channelInfo;
          return nextState
        }
        default:
            return state;
    }
}

export default channelsReducer;
