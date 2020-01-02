import { useSubscription } from "urql";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import LiveChips from './LiveChips'

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
        dispatch({ type: actions.SUBSCRIPTION_DATA_LOADING, data });
    }, [dispatch, data, error]);
    
    return <div><LiveChips/></div>;
};
export default SubscriptionResults;

