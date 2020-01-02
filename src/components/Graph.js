import React from "react";
import { useSelector } from "react-redux";
import * as crosshair from "chartjs-plugin-crosshair";
import * as zoom from 'chartjs-plugin-zoom'
import { Line } from "react-chartjs-2";

export default function Graph(props) {
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
                label: "Flare (°F)",
                yAxisID: "temperature",
                fill: false,
                borderColor: "blue",
                backgroundColor: "blue",

                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
                data: values
            });
        }
        if (selectedGraph.includes("waterTemp")) {
            const values = [];
            measurements.waterTemp.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Water (°F)",
                yAxisID: "temperature",
                fill: false,
                borderColor: "orange",
                backgroundColor: "orange",

                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
                data: values
            });
        }
        if (selectedGraph.includes("oilTemp")) {
            const values = [];
            measurements.oilTemp.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Oil (°F)",
                yAxisID: "temperature",
                fill: false,
                borderColor: "red",
                backgroundColor: "red",

                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
                data: values
            });
        }
        if (selectedGraph.includes("casingPressure")) {
            const values = [];
            measurements.casingPressure.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Casing (PSI)",
                yAxisID: "pressure",
                fill: false,
                borderColor: "purple",
                backgroundColor: "purple",

                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
                data: values
            });
        }
        if (selectedGraph.includes("tubingPressure")) {
            const values = [];
            measurements.tubingPressure.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Tubing (PSI)",
                yAxisID: "pressure",
                fill: false,
                borderColor: "green",
                backgroundColor: "green",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
                data: values
            });
        }
        if (selectedGraph.includes("injValveOpen")) {
            const values = [];
            measurements.injValveOpen.map(measurement => {
                return values.push(measurement.value);
            });
            dataSets.push({
                label: "Inject Valve Open %",
                yAxisID: "percentage",
                fill: false,
                borderColor: "darkGrey",
                backgroundColor: "darkGrey",
                lineTension: 0.1,
                borderWidth: 1,
                pointRadius: .5,
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
        tooltips: {
            mode: "index",
            intersect: false,
            position: "average"
        },
        plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,
        
                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    // A function that is called as the user is panning and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'x',
        
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: Date.now() - 1800002,
                        y: 0
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: Date.now(),
                        y: 2000
                    },
        
                    // Function called while the user is panning
                    onPan: function({chart}) { console.log(`I'm panning!!!`); },
                    // Function called once panning is completed
                    onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
                },
        
                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,
        
                    // Enable drag-to-zoom behavior
                    drag: false,
        
                    // Drag-to-zoom effect can be customized
                    // drag: {
                    // 	 borderColor: 'rgba(225,225,225,0.3)'
                    // 	 borderWidth: 5,
                    // 	 backgroundColor: 'rgb(225,225,225)',
                    // 	 animationDuration: 0
                    // },
        
                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    // A function that is called as the user is zooming and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'x',
        
                    rangeMin: {
                        // Format of min zoom range depends on scale type
                        x: Date.now() - 1800000,
                        y: 0
                    },
                    rangeMax: {
                        // Format of max zoom range depends on scale type
                        x: Date.now() + 2000,
                        y: 2000
                    },
        
                    // Speed of zoom via mouse wheel
                    // (percentage of zoom on a wheel event)
                    speed: 0.1,
        
                    // Function called while the user is zooming
                    onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                    // Function called once zooming is completed
                    onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
                }
            },
            crosshair: {
                line: {
                    color: "#F66", // crosshair line color
                    width: 1, // crosshair line width
                    dashPattern: [5, 5] // crosshair line dash pattern
                },
                sync: {
                    enabled: true, // enable trace line syncing with other charts
                    group: 1, // chart group
                    suppressTooltips: false // suppress tooltips when showing a synced tracer
                },
                
                zoom: {
                    enabled: false, // enable zooming
                    zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
                    zoomboxBorderColor: "#48F", // border color of zoom box
                    zoomButtonText: "Reset Zoom", // reset zoom button text
                    zoomButtonClass: "reset-zoom" // reset zoom button class
                },
                callbacks: {
                    beforeZoom: function(start, end) {
                        // called before zoom, return false to prevent zoom
                        return true;
                    },
                    afterZoom: function(start, end) {
                        // called after zoom
                    }
                }
            }
        },
        responsive: true,
        animation: { duration: 0 },
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    display: props.showTemp,
                    type: "linear",
                    id: "temperature",
                    scaleLabel: {
                        display: true,
                        labelString: "°F"
                    }
                },
                {
                    display: props.showPress,
                    type: "linear",
                    id: "pressure",
                    scaleLabel: {
                        display: true,
                        labelString: "PSI"
                    }
                },
                {
                    display: props.showPercent,
                    type: "linear",
                    id: "percentage",
                    scaleLabel: {
                        display: true,
                        labelString: "% Open"
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
