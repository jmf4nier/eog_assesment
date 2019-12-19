import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function Graph() {

    const timeStamps = useSelector(state =>
        state.flareTemp.map(data => {
            const time = moment.unix(data.at).format(" h:mm A");
            return time;
        })
    );
    const flareTemps = useSelector(state =>
        state.flareTemp.map(data => {
           if (data.value !== undefined && data.value !== null ){
               return data.value
           }
             
        })
    );
    const tubingPressure = useSelector(state =>
        state.tubingPressure.map(data => {
            return data.value;
        })
    );
    console.log(timeStamps);
    const data = {
        labels: timeStamps,
        datasets: [
            {
                label: "Flare Temperature",
                fill: false,
                lineTension: 0.1,
                data: [1,3,2,4,5,63,2]
            },
            {
                label: "Tubing Pressure",
                fill: false,
                lineTension: 0.1,
                data: tubingPressure.value
            }
        ]
    };

    return (
        <div>
            <h2>Line Example</h2>

            <Line data={data} />
        </div>
    );
}
