import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderRadius: "5px",
        width: "15%",
        margin: "1%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 500
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    },
    label: {
        fontWeight: "800"
    },
    noLabel: {
        marginTop: theme.spacing(3)
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const metrics = [
    "flareTemp",
    "tubingPressure",
    "injValveOpen",
    "oilTemp",
    "casingPressure",
    "waterTemp"
];

function getStyles(name, metricName, theme) {
    return {
        fontWeight:
            metricName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
}

export default function SelectBox() {
    const classes = useStyles();
    const theme = useTheme();
    const [metricName, setmetricName] = React.useState([]);
    const dispatch = useDispatch();
    const handleChange = event => {
        setmetricName(event.target.value);
        handleDispatch(event.target.value);
    };
    const handleDispatch = metric =>
        dispatch({ type: actions.SET_SELECTED_METRIC, metric });

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel
                    htmlFor="select-multiple-chip"
                    className={classes.label}
                >
                    Metrics...
                </InputLabel>
                <Select
                    multiple
                    value={metricName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {metrics.map(metric => (
                        <MenuItem
                            key={metric}
                            value={metric}
                            style={getStyles(metric, metricName, theme)}
                        >
                            {metric}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
