import { csrfFetch } from "./csrf";

const GET_ALL_CHANNELS = "channels/getChannels";
const GET_CHANNELS_MESSAGES = "channels/getChannelsMessages"
const DELETE_CHANNEL = "channels/deleteChannel"
const UPDATE_CHANNEL = "channels/updateChannel"
const CREATE_CHANNEL = "channels/createChannel"
const CREATE_CHANNEL_MESSAGE = "channels/createMessage"


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

const updateChannel = (payload) => ({
  type: UPDATE_CHANNEL,
  payload: payload
})

const createChannelMessage = (message, channelId) => ({
  type: CREATE_CHANNEL_MESSAGE,
  payload: { message, channelId },
});

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
    dispatch(getChannelMessages(data, channelId));
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}

export const thunkUpdateChannel = (payload, channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const updatedChannel = await res.json();
    dispatch(updateChannel(updatedChannel))
    return updatedChannel
  } else {
    const error = await res.json();
    throw new Error(error.message);
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
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteChannel(channelId))
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}

export const thunkCreateChannelMessage = (channelId, message) => async (dispatch) => {
  
    const response = await csrfFetch(`/api/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createChannelMessage(data, channelId));
      return data;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  
};



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
        case UPDATE_CHANNEL: {
          let newState = structuredClone(state);
          const channel = action.payload;
          newState[channel.id] = channel;
          return newState
        }
        case DELETE_CHANNEL: {
          let newState = structuredClone(state);
          delete newState[action.payload];
          return newState
        }
        case CREATE_CHANNEL_MESSAGE: {
          let newState = structuredClone(state);
          const { message, channelId } = action.payload;
          if (!newState[channelId].Messages) {
              newState[channelId].Messages = [];
          }
          newState[channelId].Messages.push(message);
          return newState;
      }
        default:
            return state;
    }
}

export default channelsReducer;
