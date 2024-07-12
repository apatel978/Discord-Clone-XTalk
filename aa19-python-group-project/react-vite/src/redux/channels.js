import { csrfFetch } from "./csrf";

const GET_ALL_CHANNELS = "channels/getChannels";
const GET_CHANNELS_MESSAGES = "channels/getChannelsMessages"
const DELETE_CHANNEL = "channels/deleteChannel"
const UPDATE_CHANNEL = "channels/deleteChannel"
const CREATE_CHANNEL = "channels/createChannel"

const getAllChannels = (servers) => ({
  type: GET_ALL_CHANNELS,
  payload: servers,
});

const getChannelMessages = (channelInfo, channelId) => ({
  type: GET_CHANNELS_MESSAGES,
  payload: {channelInfo, channelId}
})

const createChannel = (payload) => ({
  type: CREATE_CHANNEL,
  payload: payload
})

const deleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  payload: channelId
})

const updateChannel = (channelId) => ({
  type: UPDATE_CHANNEL,
  payload: channelId
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


export const thunkCreateChannel = (payload, serverId) => async (dispatch) => {
  const response = await csrfFetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const channel = await response.json()
    dispatch(createChannel(channel))
    return channel
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
          let nextState = structuredClone(state);
          const {channelInfo, channelId} = action.payload;
          nextState[channelId] = channelInfo;
          return nextState
        }
        case CREATE_CHANNEL: {
          let newState=structuredClone(state);
          const channel = action.payload;
          newState[channel.id] = channel;
          return newState
        }
        default:
            return state;
    }
}

export default channelsReducer;
