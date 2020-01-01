import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));

export default function ContainedButtons() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [live, changeLive] = useState(false);

    const handleClick = bool => {
        changeLive(bool);
        handleDispatch(bool);
    };
    const handleDispatch = bool => {
        dispatch({ type: actions.GET_LIVE_STREAM, bool });
    };
    return (
        <div className={classes.root}>
            {live ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleClick(false);
                    }}
                >
                    Static View
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleClick(true);
                    }}
                >
                    Go Live
                </Button>
            )}
        </div>
    );
}
