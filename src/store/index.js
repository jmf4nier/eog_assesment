import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import flareReducer from './reducers/Flare';
import oilReducer from './reducers/OilTemp'
import tubingReducer from './reducers/TubingPressure'

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
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
