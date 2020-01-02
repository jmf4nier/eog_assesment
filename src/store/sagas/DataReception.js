import { takeEvery, put } from "redux-saga/effects";
import * as actions from "../actions";



function* historicalDataReceived(action) {
    try {
        yield put({ type: actions.HISTORICAL_DATA_SUCCESS, data: action.data });
    } catch (e) {
        yield put({ type: actions.HISTORICAL_DATA_ERROR, error: e.message });
    }
}

function* watchHistoricalData() {
    yield takeEvery(actions.HISTORICAL_DATA_LOADING, historicalDataReceived);
}

function* currentDataReceived(action) {
    try {
        yield put({ type: actions.SUBSCRIPTION_DATA_SUCCESS, data: action.data });
    } catch (e) {
        yield put({ type: actions.SUBSCRIPTION_DATA_ERROR, error: e.message });
    }
}

function* watchCurrentData() {
    yield takeEvery(actions.SUBSCRIPTION_DATA_LOADING, currentDataReceived);
}

export default [watchHistoricalData, watchCurrentData];
