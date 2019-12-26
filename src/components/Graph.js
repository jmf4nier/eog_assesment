import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function Graph() {

    
    
    const data = {
        labels: ['time1','time2', 'time3', 'time 4', 'time 5', 'time 6'],
        
        datasets: [
            {
                label: "Flare Temperature",
                fill: false,
                lineTension: 0.1,
                data: [1,3,2,4,5,63,21]
            },
            {
                label: "Tubing Pressure",
                fill: false,
                lineTension: 0.1,
                data: [1,26,33,54,5,5]
            }
        ]
    };
    const options = {
        scales:{
            xAxes:[{
               
                
                ticks: {
                    source: 'data',
                    maxRotations: 15
                },
                
            }]
        }
            
        
    }

    return (
        <div>
            <h2>Line Example</h2>

            <Line data={data} options={options} />
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