import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function Graph() {
    const history = useSelector(state => state.historicalData.data);
    const time = () => {
        if (history.length > 0) {
            return history[0].measurements.map(measurement => measurement.at);
        }
        return [1, 3, 4, 5];
    };
    const historical = () => {
        if (history.length > 0) {
            return history[0].measurements.map(
                measurement => measurement.value
            );
        }
        return [1, 3, 4, 5];
    };
    console.log(time());
    const data = {
        labels: time(),

        datasets: [
            {
                label: "Flare Temperature",
                fill: false,
                borderColor: "blue",
                lineTension: 0.1,
                borderWidth: 1,
                data: historical()
            }
            // {
            //     label: "Tubing Pressure",
            //     fill: false,
            //     lineTension: 0.1,
            //     data: [1, 26, 33, 54, 5, 5]
            // }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
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
        <div >
            
            <div style={{ marginLeft:'5%' ,width: "80vw", height: '25vw'}}>
                
                <Line  data={data} options={options} />
            </div>
        </div>
    );
}

// const timeStamps = useSelector(state =>
//     state.flareTemp.map((data, i) => {

//         if(i>0){
//             const time = moment.unix(data.at).format(" h:mm A");

//         return time;}

//     })
// );

// const flareTemps = useSelector(state =>
//     state.flareTemp.map(data => {
//        if (data.value !== undefined && data.value !== null ){
//            return data.value
//        }

//     })
// );
// const tubingPressure = useSelector(state =>
//     state.tubingPressure.map(data => {
//         return data.value;
//     })
// );
