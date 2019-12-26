import { takeEvery,  put } from "redux-saga/effects";
import * as actions from "../actions";


async function dataFetch ()  {

    return null
}

function* historicalDataReceived(action) {
  
  try{
    yield put ({type:  actions.HISTORICAL_DATA_SUCCESS, data: action.data})
  }catch(e){
    yield put ({type:  actions.HISTORICAL_DATA_ERROR, error: e.message})

  }
  
}

function* watchHistoricalData() {
  yield takeEvery(actions.HISTORICAL_DATA_LOADING, historicalDataReceived);
}

export default [watchHistoricalData];
