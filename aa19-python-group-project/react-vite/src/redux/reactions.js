import { csrfFetch } from "./csrf";

const ADD_REACTION = "reactions/addReaction";

const addReaction = (reaction) => ({
    type: ADD_REACTION,
    payload: reaction
})

export const addReactionToAMessage = (payload, messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}/reactions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const reaction = await res.json();
        dispatch(addReaction(reaction));
        return reaction
    } else {
        const error = await res.json();
        throw new Error(error.message);
    }
}

const initialState = {};

function reactionsReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_REACTION: {
            let nextState = structuredClone(state);
            console.log('PAYLOAD', action.payload)
            return nextState;
        }
        default:
            return state
    }
}

export default reactionsReducer;
