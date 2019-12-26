import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import historicalDataReducer from './reducers/HistoricalData'
import selectBoxReducer from "./reducers/SelectBoxReducer";
// import flareReducer from "./reducers/FlareReducer";
// import oilReducer from "./reducers/OilTempReducer";
// import tubingReducer from "./reducers/TubingPressureReducer";// import injValveReducer from "./reducers/InjValveReducer";
// import casingReducer from "./reducers/CasingPressureReducer";
// import waterReducer from "./reducers/WaterTempReducer";

export default () => {
   
    const rootReducer = combineReducers({
        weather: weatherReducer,
        selectedMetrics: selectBoxReducer,
        historicalData: historicalDataReducer
    });

    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));

    sagas.forEach(sagaMiddleware.run);

    return store;
};
