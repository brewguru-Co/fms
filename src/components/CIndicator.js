import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../assets/jss/components/CIndicatorStyle";

const useStyles = makeStyles(styles);

function CIndicator() {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}

export default CIndicator;
