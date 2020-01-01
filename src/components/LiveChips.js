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
    const {flareTemp,oilTemp,casingPressure,waterTemp,injValveOpen,tubingPressure} = useSelector(state => state.data.latestValues);
    
    const selectedMetrics = useSelector(state => state.selectedMetrics);

    const handleChips = () => {
        
        
        return selectedMetrics.map(metric=>{
            if (metric === 'flareTemp'){
                return <Chip label={`Flare ${flareTemp}`}/>
            }
            if (metric === 'oilTemp'){
                return <Chip label={`Oil Temperature ${oilTemp}`}/>
            }
            if (metric === 'waterTemp'){
                return <Chip label={`Water Temperature ${waterTemp}`}/>
            }
            if (metric === 'casingPressure'){
                return <Chip label={`Casing Pressure ${casingPressure}`}/>
            }
            if (metric === 'tubingPressure'){
                return <Chip label={`Tubing Pressure ${tubingPressure}`}/>
            }
            if (metric === 'injValveOpen'){
                return <Chip label={`Inject Valve ${injValveOpen}`}/>
            }
            return null
        })
    };

    return (
    <div >
        
        {(liveStreamOn? handleChips(): null )}
    </div>
    )
}
