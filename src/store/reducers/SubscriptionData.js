import * as actions from "../actions";

const initialState = {
    data: [],
    loading: false,
    error: ""
};

export default function subscriptionDataReducer(state = initialState, action) {
    const {data} = action
    
    switch (action.type) {
        case actions.SUBSCRIPTION_DATA_SUCCESS: {
            return {
                 
                ...state,
                data: [...state.data, data],
                loading: false
            };
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
                error: ''
            }
        }
        default: {
            return state;
        }
    }
}
