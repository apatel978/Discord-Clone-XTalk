
import { csrfFetch } from "./csrf";

const GET_ALL_SERVERS = "servers/getAllServers";


const getAllServers = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers,
  });

  
  export const thunkGetAllServers = () => async (dispatch) => {
    const res = await csrfFetch("/api/servers/all");
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return;
      }
      dispatch(getAllServers(data));
    }
  };

  const initialState = {};

  function allServersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_SERVERS: {
        let nextState = {...state};
        action.payload.Servers.forEach((server) => {
              nextState[server.id] = server;
        })
        return {
        ...state,
        ...nextState
        };
      }default:
      return state;
  }
}

export default allServersReducer
