import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import LiveButton from "./components/LiveButton";
import Wrapper from "./components/Wrapper";
import SubscriptionHandler from "./components/SubscriptionHandler";
import HistoricDataHandler from "./components/HistoricDataHandler";
import Graph from "./components/Graph";
// import Weather from "./components/Weather";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
    Provider,
    createClient,
    defaultExchanges,
    subscriptionExchange
} from "urql";

const subscriptionClient = new SubscriptionClient(
    "ws://react.eogresources.com/graphql",
    {}
);

const client = createClient({
    url: "https://react.eogresources.com/graphql",
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: operation =>
                subscriptionClient.request(operation)
        })
    ]
});
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            main: "rgb(39,49,66)"
        },
        secondary: {
            main: "rgb(197,208,222)"
        },
        background: {
            main: "rgb(226,231,238)"
        }
    }
});

const App = (props) => {
    const graphSelected = useSelector(state => state.selectedMetrics);
    const displayTempAxis = graphSelected.includes(
        "flareTemp" || "waterTemp" || "oilTemp"
    );
    const displayPressureAxis = graphSelected.includes(
        "tubingPressure" || "casingPressure"
    );
    const displayPercentageAxis = graphSelected.includes("injValveOpen");

    const liveSelected = useSelector(state => state.live);
    return (
        <Provider value={client}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Wrapper>
                    <Header />
                    {liveSelected && graphSelected.length > 0 ? (
                        <SubscriptionHandler />
                    ) : null}
                    {/* <Weather /> */}
                    <HistoricDataHandler />
                    {graphSelected.length > 0 ? (
                        <div>
                            <Graph
                                showTemp={displayTempAxis}
                                showPress={displayPressureAxis}
                                showPercent={displayPercentageAxis}
                            />
                            <LiveButton />
                        </div>
                    ) : null}
                    <ToastContainer />
                </Wrapper>
            </MuiThemeProvider>
        </Provider>
    );
};
export default App;
