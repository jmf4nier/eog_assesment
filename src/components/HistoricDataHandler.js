// import { Provider, Client, useQuery } from "urql";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import {useQuery} from 'urql'
// import LinearProgress from "@material-ui/core/LinearProgress";


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


    const time = Date.now() - 20000;
    
    
    
    
   


    

 const HistoricalResults = () => {
    const [result] = useQuery({
        query: query,
        variables: {
            time
        }
    })
    const { fetching, data, error } = result;
    const dispatch = useDispatch()
    useEffect(() => {
        
            if (error) {
              dispatch({ type: actions.HISTORICAL_DATA_ERROR, error: error.message });
              return;
            }
            if (!data) return;
            dispatch({ type: actions.HISTORICAL_DATA_LOADING, data});
          },
          [dispatch, data, error]
    )
    return(
        <div>stuff</div>)
     
    }

export default HistoricalResults




// not being used for now:
// const metricNames = [     
//     "flareTemp",
//     "tubingPressure",
//     "injValveOpen",
//     "oilTemp",
//     "casingPressure",
//     "waterTemp"
// ];