import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as actions from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "./Chip";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));

export default function LiveChips(props) {
    
    const classes = useStyles();
    const liveStreamOn = useSelector(state => state.live);
    const latestValues = useSelector(state => state.data.latestValues);
    console.log(latestValues.flareTemp)
    const selectedMetrics = useSelector(state => state.selectedMetrics);

    const handleChips = () => {
        
        console.log()
        return selectedMetrics.map(metric=>{
            if (metric === 'flareTemp'){
                console.log('made it')
                return <Chip label={props.latestValues.flareTemp}/>
            }
            // if (metric === 'oilTemp'){
            //     return <Chip label={oilTemp}/>
            // }
            // if (metric === 'waterTemp'){
            //     return <Chip label={waterTemp}/>
            // }
            // if (metric === 'casingPressure'){
            //     return <Chip label={casingPressure}/>
            // }
            // if (metric === 'tubingPressure'){
            //     return <Chip label={tubingPressure}/>
            // }
            // if (metric === 'injValveOpen'){
            //     return <Chip label={injValveOpen}/>
            // }
            return null
        })
    };

    return (
    <div >
        
        {(liveStreamOn? handleChips(): null )}
    </div>
    )
}
