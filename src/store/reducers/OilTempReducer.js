import * as actions from "../actions";

const initialState = [
    {
        metric: null,
        at: null,
        value: null,
        unit: null
    }
];

const oilTempReceived = (state, action) => {
    const { data } = action;
    const { at, value, unit, metric } = data;

    return [
        ...state,
        {
            at,
            value,
            unit,
            metric
        }
    ];
};

const handlers = {
    [actions.OIL_TEMP_RECEIVED]: oilTempReceived
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
