// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../store/actions";
// import { SubscriptionResults, client } from "../queries/queries";
// import { Provider } from "urql";

// const getFlareTemp = state => {
//   const { at, value, unit } = state.flareTemp;
//   return {
//     at,
//     value,
//     unit
//   };
// };

// export default () => {
//   return (
//     <Provider value={client}>
//       <FlareTemp />
//     </Provider>
//   );
// };

// const FlareTemp = () => {
//   const result = SubscriptionResults();
//   console.log(result);
//   const dispatch = useDispatch();
//   const { fetching, data, error } = result;
//   const { at, value, unit } = useSelector(getFlareTemp);
//   useEffect(() => {
//     if (error) {
//       dispatch({ type: actions.API_ERROR, error: error.message });
//       return;
//     }
//     if (!data) return console.log("halp");
//     const { newMeasurement } = data;
//     if (data.newMeasurement.metric === "flareTemp") {
//       dispatch({ type: actions.FLARE_DATA_RECEIVED, newMeasurement });
//     }
//   }, [dispatch, data, error]);

//   return (
//     <div>
//       <h1>{at}</h1>
//       <h1>{value}</h1>
//     </div>
//   );
// };
