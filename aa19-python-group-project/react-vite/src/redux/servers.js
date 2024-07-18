import { csrfFetch } from "./csrf";


const GET_SERVERS = "servers/getServers";
const CREATE_SERVER = "servers/createServer";
const GET_SERVER_BY_ID = "servers/getServerById";
const DELETE_SERVER = "servers/deleteServer";
const LEAVE_SERVER = "servers/leaveServer";
const EDIT_SERVER = "servers/editServer";
const JOIN_SERVER = 'servers/joinServer';

const joinServer = (server) => ({
  type: JOIN_SERVER,
  payload: server,
});

const getServers = (servers) => ({
  type: GET_SERVERS,
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

const deleteServer = (serverId) => ({
  type: DELETE_SERVER,
  payload: serverId,
});

const leaveServer = (serverId) => ({
  type: LEAVE_SERVER,
  payload: serverId,
});

const editServer = (server) => ({
  type: EDIT_SERVER,
  payload: server,
});


export const thunkJoinServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}/join`, {
    method: 'POST',
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(joinServer(server));
    return server;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};



export const thunkGetServers = () => async (dispatch) => {
  const res = await csrfFetch("/api/servers/");
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getServers(data));
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
      preview: previewImageUrl
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
    dispatch(createServer(serverDataResponse));
    return serverDataResponse;
  } else {
    const error = await serverResponse.json();
    throw new Error(error.message);
  }
};

    export const thunkDeleteServer = (serverId) => async (dispatch) => {
      const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
      });
    
      if (res.ok) {
        dispatch(deleteServer(serverId));
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    };
    
    export const thunkLeaveServer = (serverId) => async (dispatch) => {
      const res = await csrfFetch(`/api/servers/${serverId}/leave`, {
        method: 'DELETE',
      });
    
      if (res.ok) {
        dispatch(leaveServer(serverId));
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    };

    export const thunkEditServer = (serverName, file, serverId) => async (dispatch) => {
      let previewImageUrl;
    
      if (file) {
        // Upload the file to get the preview image URL
        const formData = new FormData();
        formData.append('file', file);
    
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST', // Typically, uploads use POST, ensure your API endpoint supports this
          body: formData,
        });
    
        const uploadData = await uploadResponse.json();
    
        if (uploadData.error) {
          throw new Error(uploadData.error);
        }
    
        previewImageUrl = uploadData.imageUrl;
      } else {
        previewImageUrl = 'https://crosstalkappbuck.s3.us-east-2.amazonaws.com/defaultserver.png';
      }
    
      const serverData = {
        name: serverName,
        preview: previewImageUrl,
      };
    
      const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverData),
      });
    
      if (res.ok) {
        const updatedServer = await res.json();
        dispatch(editServer(updatedServer));
        return updatedServer;
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    };

const initialState = {};


function serversReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SERVERS: {
        let nextState = {...state};
        action.payload.Servers.forEach((server) => {
              nextState[server.id] = server;
        })
        return {
        ...state,
        ...nextState
        };
      }
      case GET_SERVER_BY_ID: {
        const server = action.payload;
        return {
          ...state,
          [server.id]: server,
        };
      }
      case CREATE_SERVER:
          return {
            ...state,
          ...state.servers,
          [action.payload.id]: action.payload
      };
      case DELETE_SERVER: {
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      }
      case LEAVE_SERVER: {
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      }
      case EDIT_SERVER: {
        const newState = { ...state };
        newState[action.payload.id] = action.payload;
        return newState;
      }
      case JOIN_SERVER: {
        return {
          ...state,
          [action.payload.id]: action.payload,
        };
      }
      default:
        return state;
    }
}

export default serversReducer;
