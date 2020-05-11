import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import SelectBox from './SelectBox'
const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
});

export default () => {
  const classes = useStyles();

  const name = "Jason Fournier's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} Graphing Practice With React/Graphql
        </Typography>
        <SelectBox/>
      </Toolbar>
    </AppBar>
  );
};
