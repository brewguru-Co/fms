import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import WarningIcon from "@material-ui/icons/Warning";
import { isToday, getTimeString } from "../lib/time";
// import { INDIGO, GRAY, WHITE, RED } from "../assets/jss";
import styles from "../assets/jss/components/NotificationRecordStyle";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;

const useStyles = makeStyles(styles);

function NotificationRecord(props) {
  const { record } = props;
  const { code, content, createdAt } = record;
  const { high, low, value } = content;

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography className={classes.title}>
            {NOTIFICATION[code]}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.content}>
            측정값: <b>{value}</b> ({low} ~ {high})
          </Typography>
        </Grid>
        <Grid item xs>
          {isToday(createdAt) ? (
            <Typography className={classes.time}>
              {getTimeString(createdAt, "A hh:mm")}
            </Typography>
          ) : (
            <Typography className={classes.time}>
              {getTimeString(createdAt, "MM/DD/YYYY")}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NotificationRecord;
