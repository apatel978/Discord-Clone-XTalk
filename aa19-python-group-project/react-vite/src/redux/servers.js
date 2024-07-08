import { csrfFetch } from "./csrf";

const GET_ALL_SERVERS = "servers/getServers";
const GET_SERVER_BY_ID = "servers/getServerById";

const getAllServers = (servers) => ({
  type: GET_ALL_SERVERS,
  payload: servers,
});

const getServerById = (server) => ({
  type: GET_SERVER_BY_ID,
  payload: server
});

export const thunkGetAllServers = () => async (dispatch) => {
  const res = await csrfFetch("/api/servers/");
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getAllServers(data));
  }
};

export const thunkServerById = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`);
  if (res.ok) {
    const server = await res.json();
    if (server.errors) {
      return;
    }
    dispatch(getServerById(server))
    return server;
  }
};

const initialState = {};

function serversReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_SERVERS: {
        let nextState = {};
        Object.entries(action.payload.Servers).forEach(([key, value]) => {
              console.log('keys', key)
              nextState[value.id] = value;
        })
        return {
          ...state,
          ...nextState
        };
      }
      case GET_SERVER_BY_ID: {
        const cloneState = structuredClone(state);
        const server = action.payload;
        console.log('SERVER: ', server);
        return cloneState;
      }
      default:
        return state;
    }
}

export default serversReducer;
