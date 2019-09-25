import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Line } from "recharts";

function CustomLine(props) {
    console.log(props.metric)
    return (
        
        <Line
            dot={false}
            type="monotone"
            dataKey="flareTemp"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            isAnimationActive={false}
        />
       
    );
}
export default CustomLine;
