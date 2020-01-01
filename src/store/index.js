import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import LiveButtonReducer from './reducers/LiveButton'
import weatherReducer from "./reducers/Weather";
import DataReducer from './reducers/Data'
// import subscriptionDataReducer from './reducers/SubscriptionData'
import selectBoxReducer from "./reducers/SelectBox";

// import flareReducer from "./reducers/FlareReducer";
// import oilReducer from "./reducers/OilTempReducer";
// import tubingReducer from "./reducers/TubingPressureReducer";// import injValveReducer from "./reducers/InjValveReducer";
// import casingReducer from "./reducers/CasingPressureReducer";
// import waterReducer from "./reducers/WaterTempReducer";

export default () => {
   
    const rootReducer = combineReducers({
        weather: weatherReducer,
        selectedMetrics: selectBoxReducer,
        data: DataReducer,
        // subscriptionData: subscriptionDataReducer,
        live: LiveButtonReducer
    });

    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));

    sagas.forEach(sagaMiddleware.run);

    return store;
};
