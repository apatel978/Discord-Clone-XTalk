import { csrfFetch } from "./csrf";

const GET_ALL_SERVERS = "servers/getServers";
const CREATE_SERVER = "servers/createServer";
const GET_SERVER_BY_ID = "servers/getServerById";

const getAllServers = (servers) => ({
  type: GET_ALL_SERVERS,
  payload: servers,
});

const getServerById = (server) => ({
  type: GET_SERVER_BY_ID,
  payload: server
});
const createServer = (server) => ({
  type: CREATE_SERVER,
  payload: server,
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

export const thunkCreateServer = (serverName, file) => async (dispatch) => {
  let previewImageUrl;

  if (file) {
    // Upload the file to get the preview image URL
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (uploadData.error) {
      throw new Error(uploadData.error);
    }

    previewImageUrl = uploadData.imageUrl;
  } else {
    previewImageUrl = 'https://crosstalkappbuck.s3.us-east-2.amazonaws.com/defaultserver.png'
  }

    const serverData = {
      name: serverName,
      preview: uploadData.imageUrl
    };

  // Send the POST request to create the server
  const serverResponse = await csrfFetch('/api/servers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serverData),
  });

    if (serverResponse.ok) {
      const serverDataResponse = await serverResponse.json();
<<<<<<< HEAD
      return serverDataResponse
    }


     const serverDataResponse = await serverResponse.json();
=======
>>>>>>> 3f9294617112fd247b6850112481a3d2339dc745
      return dispatch(createServer(serverDataResponse ))
    }

<<<<<<< HEAD
  } catch (error) {

  }
=======
>>>>>>> 3f9294617112fd247b6850112481a3d2339dc745
}

const initialState = {};


function serversReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_SERVERS: {
        let nextState = {};
        action.payload.Servers.forEach((value) => {
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
        const serverId = Number(server.id);
        // console.log(cloneState)
        cloneState[serverId] = server
        // console.log('SERVER: ', server);
        return cloneState;
      }
      case CREATE_SERVER:
          return {
            ...state,
          ...state.servers,
          [action.payload.id]: action.payload

      };
      default:
        return state;
    }
}

export default serversReducer;
