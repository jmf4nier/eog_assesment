import * as actions from "../actions";

const initialState = {
  metric: null,
  at: null,
  value: null,
  unit: null
};

const tubingPressureReceived = (state, action) => {
  const { newMeasurement } = action;
  const { at, value, unit, metric } = newMeasurement;

  return {
    at,
    value,
    unit,
    metric
  };
};

const handlers = {
  [actions.TUBING_PRESSURE_RECEIVED]: tubingPressureReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
