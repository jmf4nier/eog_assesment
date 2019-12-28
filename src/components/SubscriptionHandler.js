import { useSubscription } from "urql";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

const subscription = `
          subscription  {
              newMeasurement {
              metric
              at
              value
              unit
              }
          }
      `;

const SubscriptionResults = () => {
    const [result] = useSubscription({
        query: subscription
    });
    const dispatch = useDispatch();
    const { data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch({ type: actions.API_ERROR, error: error.message });
            return;
        }
        if (!data) return console.log("halp");
        

        dispatch({ type: actions.SUBSCRIPTION_DATA_LOADING, data });
    }, [dispatch, data, error]);

    return <div>subscription</div>;
};
export default SubscriptionResults;

// const { newMeasurement } = data;
// switch (newMeasurement.metric) {
//     case "flareTemp":
//         dispatch({ type: actions.FLARE_DATA_RECEIVED, newMeasurement });
//         break;
//     case "oilTemp":
//         dispatch({ type: actions.OIL_TEMP_RECEIVED, newMeasurement });
//         break;
//     case "tubingPressure":
//         dispatch({
//             type: actions.TUBING_PRESSURE_RECEIVED,
//             newMeasurement
//         });
//         break;
//     case "injValveOpen":
//         dispatch({ type: actions.INJ_VALVE_STATUS, newMeasurement });
//         break;
//     case "casingPressure":
//         dispatch({
//             type: actions.CASING_PRESSURE_RECEIVED,
//             newMeasurement
//         });
//         break;
//     case "waterTemp":
//         dispatch({ type: actions.WATER_TEMP_RECEIVED, newMeasurement });
//         break;
//     default:
//         break;
// }
