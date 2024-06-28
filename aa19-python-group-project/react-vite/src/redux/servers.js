const GET_ALL_SERVERS = "servers/getServers";

const getAllServers = (servers) => ({
  type: GET_ALL_SERVERS,
  payload: servers,
});

export const thunkGetAllServers = () => async (dispatch) => {
  const res = await fetch("/api/servers/");
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    } else {
      console.error("Failed to fetch servers");
    }
    dispatch(getAllServers(data));
  }
};

const initialState = {};

function serversReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVERS:
            let nextState = {};
            Object.entries(action.payload.Servers).forEach(([key, value]) => {
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

export default serversReducer;
