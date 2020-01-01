import * as actions from "../actions";

const initialState = false

const getLiveStream = (state, action) => {
    const { bool } = action;
    return bool
};

const handlers = {
    [actions.GET_LIVE_STREAM]: getLiveStream
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
