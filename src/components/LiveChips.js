import React from "react";
import { useSelector } from "react-redux";
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
                return <Chip key={metric} label={`Flare ${flareTemp}`}/>
            }
            if (metric === 'oilTemp'){
                return <Chip key={metric} label={`Oil Temperature ${oilTemp}`}/>
            }
            if (metric === 'waterTemp'){
                return <Chip key={metric} label={`Water Temperature ${waterTemp}`}/>
            }
            if (metric === 'casingPressure'){
                return <Chip key={metric} label={`Casing Pressure ${casingPressure}`}/>
            }
            if (metric === 'tubingPressure'){
                return <Chip key={metric} label={`Tubing Pressure ${tubingPressure}`}/>
            }
            if (metric === 'injValveOpen'){
                return <Chip key={metric} label={`Inject Valve ${injValveOpen}`}/>
            }
            return null
        })
    };

    return (
    <div className={classes.root} >
        
        {(liveStreamOn? handleChips(): null )} 
    </div>
    )
}
