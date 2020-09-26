import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { isToday, getTimeString } from "../lib/time";
import styles from "../assets/jss/components/notificationStyle";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;

const useStyles = makeStyles(styles);

function Notification(props) {
  const { record } = props;
  const { code, max, min, value, createdAt } = record;

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography className={classes.title}>
            {NOTIFICATION[code]}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.content}>
            측정값: <b>{value}</b>
          </Typography>
          <Typography className={classes.content}>
            최적 범위: {min} ~ {max}
          </Typography>
        </Grid>
        <Grid item xs>
          {isToday(createdAt) ? (
            <Typography className={classes.time}>
              {getTimeString(createdAt, "A hh:mm")}
            </Typography>
          ) : (
            <Typography className={classes.time}>
              {getTimeString(createdAt, "YYYY-MM-DD A hh:mm")}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Notification;
