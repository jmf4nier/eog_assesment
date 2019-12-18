import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
// import weatherReducer from "./reducers/Weather";
import flareReducer from "./reducers/FlareReducer";
import oilReducer from "./reducers/OilTempReducer";
import tubingReducer from "./reducers/TubingPressureReducer";
import selectBoxReducer from "./reducers/SelectBoxReducer";
import injValveReducer from "./reducers/InjValveReducer";
import casingReducer from "./reducers/CasingPressureReducer";
import waterReducer from "./reducers/WaterTempReducer";

export default () => {
   
    const rootReducer = combineReducers({
        selectedMetrics: selectBoxReducer,
        flareTemp: flareReducer,
        oilTemp: oilReducer,
        tubingPressure: tubingReducer,
        injValveStatus: injValveReducer,
        casingPressure: casingReducer,
        waterTemp: waterReducer
    });

    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));

    sagas.forEach(sagaMiddleware.run);

    return store;
};
