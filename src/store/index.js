import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import flareReducer from './reducers/Flare';
import oilReducer from './reducers/OilTemp'
import tubingReducer from './reducers/TubingPressure'
import selectBoxReducer from './reducers/SelectBox'

export default () => {
  const rootReducer = combineReducers({
    selectedMetrics: selectBoxReducer,
    flareTemp: flareReducer,
    oilTemp: oilReducer,
    tubingPressure: tubingReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
