import { Provider, Client, useQuery } from "urql";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const client = new Client({
    url: "https://react.eogresources.com/graphql"
});
const query = `
          query ($time: Timestamp){
            getMultipleMeasurements(input: [
                { metricName: "flareTemp", after: $time }
                { metricName: "tubingPressure", after: $time }
                { metricName: "injValveOpen", after: $time }
                { metricName: "oilTemp", after: $time }
                { metricName: "casingPressure", after: $time }
                { metricName: "waterTemp", after: $time }
            ]) 
            {
                metric
                measurements{
                  metric
                  at
                  value
                  unit
                }
              }
          }
      `;
// const metricNames = [
//     "flareTemp",
//     "tubingPressure",
//     "injValveOpen",
//     "oilTemp",
//     "casingPressure",
//     "waterTemp"
// ];
export default () => {
    return (
        <Provider value={client}>
            <HistoricalResults />
        </Provider>
    );
};

const time = Date.now() - 10000;
const HistoricalResults = () => {
    // console.log(time);

    const [result] = useQuery({
        query,
        variables: {
            time
        }
    });
    const dispatch = useDispatch();
    const { fetching, data, error } = result;
    // console.log(fetching)
    useEffect(() => {
        if (error) {
            dispatch({ type: actions.API_ERROR, error: error.message });
            return;
        }
        if (!data) return console.log("nope");
        const { getMultipleMeasurements } = data;
        
        getMultipleMeasurements.map(type => {
            return type.measurements.map(data => {
                
                if (data.metric === "flareTemp"){
                    return dispatch({ type: actions.FLARE_DATA_RECEIVED, data });
                }
                if (data.metric === "tubingPressure"){
                    return dispatch({ type: actions.TUBING_PRESSURE_RECEIVED, data });
                }
                if (data.metric === "oilTemp"){
                    return dispatch({ type: actions.OIL_TEMP_RECEIVED, data });
                }
                if (data.metric === "waterTemp"){
                    return dispatch({ type: actions.WATER_TEMP_RECEIVED, data });
                }
                if (data.metric === "casingPressure"){
                    return dispatch({ type: actions.CASING_PRESSURE_RECEIVED, data });
                }
                if (data.metric === "injValveOpen"){
                    return dispatch({ type: actions.INJ_VALVE_STATUS, data });
                }
                return null
            })

        });
    }, [dispatch, data, error]);

    return null;
};
