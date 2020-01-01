import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

export default function Graph() {
    const measurements = useSelector(state => state.data);

    const selectedGraph = useSelector(state => state.selectedMetrics);

    const time = () => {
        const times = [];
        measurements.flareTemp.map(flareReadings => {
            return times.push(flareReadings.at);
        });
        return times;
    };
    const dataHandler = () => {
        const dataSets = [];
        if (selectedGraph.includes("flareTemp")) {
            const values = [];
            measurements.flareTemp.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Flare Temperature",
                fill: false,
                borderColor: "blue",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        if (selectedGraph.includes("waterTemp")) {
            const values = [];
            measurements.waterTemp.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Water Temperature",
                fill: false,
                borderColor: "orange",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        if (selectedGraph.includes("oilTemp")) {
            const values = [];
            measurements.oilTemp.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Oil Temperature",
                fill: false,
                borderColor: "red",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        if (selectedGraph.includes("casingPressure")) {
            const values = [];
            measurements.casingPressure.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Casing Pressure",
                fill: false,
                borderColor: "purple",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        if (selectedGraph.includes("tubingPressure")) {
            const values = [];
            measurements.tubingPressure.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Tubing Pressure",
                fill: false,
                borderColor: "green",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        if (selectedGraph.includes("injValveOpen")) {
            const values = [];
            measurements.injValveOpen.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Inject Valve Opening %",
                fill: false,
                borderColor: "darkGrey",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: 1.5,
                data: values
            });
        }
        return dataSets;
    };
    const data = {
        labels: time(),

        datasets: dataHandler()
    };
    const options = {
        responsive: true,
        animation: { duration: 0 },
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        lineWidth: 3
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        display: true,
                        lineWidth: 3
                    },
                    type: "time",
                    time: {
                        unit: "hour",
                        stepSize: 0.083,
                        round: "second",
                        tooltipFormat: "h:mm:ss a",
                        displayFormats: {
                            hour: "h:mm a"
                        }
                    }
                }
            ]
        }
    };

    return (
        <div>
            <div style={{ marginLeft: "5%", width: "80vw", height: "30vw" }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
