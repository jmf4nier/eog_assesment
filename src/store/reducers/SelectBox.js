import * as actions from "../actions";

const initialState = []

const setSelection = (state, action) => {
    //action payload recieved as array from dispatch in component
    const { metric } = action;
    return metric;
};

const handlers = {
    [actions.SET_SELECTED_METRIC]: setSelection
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
