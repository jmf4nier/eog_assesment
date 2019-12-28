import * as actions from "../actions";

const initialState = {
    data: [],
    loading: false,
    error: ""
};

export default function historicalDataReducer(state = initialState, action) {
    const {data} = action
    switch (action.type) {
        case actions.HISTORICAL_DATA_SUCCESS: {
            return {
                 
                data: data.getMultipleMeasurements,  //grabs and stores only the array of measurements as a shortcut
                error: '',
                loading: false
            };
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
                error: ''
            }
        }
        default: {
            return state;
        }
    }
}
