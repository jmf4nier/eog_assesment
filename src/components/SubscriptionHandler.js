import {
  Provider,
  Client,
  defaultExchanges,
  subscriptionExchange,
  useSubscription
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql",
  {}
);

const client = new Client({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});
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

export default () => {
  return (
    <Provider value={client}>
      <SubscriptionResults />
    </Provider>
  );
};

const SubscriptionResults = () => {
  const [result] = useSubscription({
    query: subscription
  });
  const dispatch = useDispatch();
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return console.log("halp");
    const { newMeasurement } = data;
    console.log(newMeasurement.metric)
    switch (newMeasurement.metric) {
      case 'flareTemp':
        dispatch({ type: actions.FLARE_DATA_RECEIVED, newMeasurement });
        break;
      case 'oilTemp':
        dispatch({ type: actions.OIL_TEMP_RECEIVED, newMeasurement });
        break;
      case 'tubingPressure':
        dispatch({ type: actions.TUBING_PRESSURE_RECEIVED, newMeasurement });
        break;
      default:
        console.log("oops");
    }
  }, [dispatch, data, error]);

  return null;
};
