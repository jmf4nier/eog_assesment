import * as actions from "../actions";

const initialState = {
    flareTemp: [],
    casingPressure: [],
    waterTemp: [],
    oilTemp: [],
    injValveOpen: [],
    tubingPressure: [],
    loading: false,
    error: "",
    latestValues: {
        flareTemp: null,
        casingPressure: null,
        waterTemp: null,
        oilTemp: null,
        injValveOpen: null,
        tubingPressure: null
    }
};

export default function DataReducer(state = initialState, action) {
    const { data } = action;
    switch (action.type) {
        case actions.HISTORICAL_DATA_SUCCESS: {
            data.getMultipleMeasurements.map(measure => {
                if (measure.metric === "flareTemp") {
                    const newstate = state.flareTemp.concat(
                        measure.measurements
                    );
                    state.flareTemp = newstate;
                }
                if (measure.metric === "waterTemp") {
                    const newstate = state.waterTemp.concat(
                        measure.measurements
                    );
                    state.waterTemp = newstate;
                }
                if (measure.metric === "casingPressure") {
                    const newstate = state.casingPressure.concat(
                        measure.measurements
                    );
                    state.casingPressure = newstate;
                }
                if (measure.metric === "injValveOpen") {
                    const newstate = state.injValveOpen.concat(
                        measure.measurements
                    );
                    state.injValveOpen = newstate;
                }
                if (measure.metric === "oilTemp") {
                    const newstate = state.oilTemp.concat(measure.measurements);
                    state.oilTemp = newstate;
                }
                if (measure.metric === "tubingPressure") {
                    const newstate = state.tubingPressure.concat(
                        measure.measurements
                    );
                    state.tubingPressure = newstate;
                }
                return state;
            });
            return state;
        }
        case actions.HISTORICAL_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case actions.HISTORICAL_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: ""
            };
        }
        case actions.SUBSCRIPTION_DATA_SUCCESS: {
            const { newMeasurement } = data;
            if (newMeasurement.metric === "flareTemp") {
                state.flareTemp.push(newMeasurement);
                state.flareTemp.shift();
                state.latestValues.flareTemp = newMeasurement.value;
            }
            if (newMeasurement.metric === "oilTemp") {
                state.oilTemp.push(newMeasurement);
                state.oilTemp.shift();
                state.latestValues.oilTemp = newMeasurement.value;
            }
            if (newMeasurement.metric === "tubingPressure") {
                state.tubingPressure.push(newMeasurement);
                state.tubingPressure.shift();
                state.latestValues.tubingPressure = newMeasurement.value;
            }
            if (newMeasurement.metric === "casingPressure") {
                state.casingPressure.push(newMeasurement);
                state.casingPressure.shift();
                state.latestValues.casingPressure = newMeasurement.value;
            }
            if (newMeasurement.metric === "waterTemp") {
                state.waterTemp.push(newMeasurement);
                state.waterTemp.shift();
                state.latestValues.waterTemp = newMeasurement.value;
            }
            if (newMeasurement.metric === "injValveOpen") {
                state.injValveOpen.push(newMeasurement);
                state.injValveOpen.shift();
                state.latestValues.injValveOpen = newMeasurement.value;
            }
            return state;
        }
        case actions.SUBSCRIPTION_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case actions.SUBSCRIPTION_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: ""
            };
        }
        default: {
            return state;
        }
    }
}
