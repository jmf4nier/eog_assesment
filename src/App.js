import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import SimpleLineChart from "./components/Graph";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import SubscriptionHandler from "./components/SubscriptionHandler";
import HistoricDataHandler from './components/HistoricDataHandler'
import Graph from './components/Graph'

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

const App = props => {
  const graphSelected = useSelector(state => state.selectedMetrics);
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Wrapper>
                <Header />
                {/* <SubscriptionHandler /> */}
                <HistoricDataHandler/>
                {/* {graphSelected.length > 0 ? (
                    null
                ) : null} */}
                <Graph />
                <ToastContainer />
            </Wrapper>
        </MuiThemeProvider>
    );
};
export default App;
