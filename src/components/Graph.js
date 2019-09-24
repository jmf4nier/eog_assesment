import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceDot,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useEffect } from "react";

const SimpleLineChart = props => {
    const allData = useSelector(state => state);
    const flareData = useSelector(state => state.flareTemp);
    const oilData = useSelector(state => state.oilTemp);
    const tubingData = useSelector(state => state.tubingPressure);
    const [data, setData] = useState([
        { flareTemp: null, oilTemp: null, tubingPressure: null, time: null }
    ]);

    useEffect(() => {
        setData([
            ...data,
            {
                time: flareData.at,
                flareTemp: flareData.value,
                oilTemp: oilData.value,
                tubingPressure: tubingData.value
            }
        ]);
    }, [
        allData,
        data,
        flareData.value,
        oilData.value,
        tubingData.value,
        flareData.at
    ]);

    return (
        <ResponsiveContainer height="80%" width="95%">
            <LineChart style={{ marginTop: "5%" }} data={data}>
                <XAxis
                    dataKey="time"
                    type="number"
                    scale="time"
                    domain={[Date.now() - 1800, Date.now()]}
                    tickFormatter={tick => moment(tick).format("HH:mm:ss")}
                    interval={100}
                />
                <YAxis />

                <CartesianGrid />
                <Tooltip />
                <Legend />
                <Line
                    dot={false}
                    type="monotone"
                    dataKey="flareTemp"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                />
                <Line
                    dot={false}
                    type="monotone"
                    dataKey="oilTemp"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SimpleLineChart;
