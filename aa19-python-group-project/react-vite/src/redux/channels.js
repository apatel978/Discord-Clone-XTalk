import { csrfFetch } from "./csrf";
const GET_ALL_CHANNELS = "channels/getChannels";

const getAllChannels = (servers) => ({
  type: GET_ALL_CHANNELS,
  payload: servers,
});

export const thunkGetAllChannels = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}/channels`);
  if (res.ok) {
    const data = await res.json();
    
    if (data.errors) {
      return;
    } 
    dispatch(getAllChannels(data));
  }
};

const initialState = {};

function channelsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CHANNELS:
            let nextState = {};
            Object.entries(action.payload.Channels).forEach(([key, value]) => {
                  nextState[value.id] = value;
            })
            return {
                ...state,
                ...nextState
            };
        default:
            return state;
    }
}

export default channelsReducer;
