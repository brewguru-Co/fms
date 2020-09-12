import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Notifications from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Popper from "@material-ui/core/Popper";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { isToday, getTimeString } from "../lib/time";
import { sortByKeyDesc } from "../lib/utils";
import styles from "../assets/jss/components/notificationPopperStyle";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;

const useStyles = makeStyles(styles);

function todaysRecords(records) {
  return sortByKeyDesc(
    records.filter((record) => isToday(record.createdAt)),
    "createdAt"
  );
}

function CListText(props) {
  const classes = useStyles();
  const { code, content, createdAt } = props.record;
  return (
    <>
      <Typography className={classes.content}>
        <b>Tank1</b> {`${NOTIFICATION[code]}`}
      </Typography>
      <Typography className={classes.time}>
        {getTimeString(createdAt, "A hh:mm")}
      </Typography>
    </>
  );
}

function NotificationPopper(props) {
  const { records } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={todaysRecords(records).length} color="error">
          <Notifications className={classes.icon} />
        </Badge>
      </IconButton>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
      >
        <Paper elevation={3}>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div>
              <Typography className={classes.title}>알림</Typography>
              <Divider />
              <List dense className={classes.list}>
                {todaysRecords(records).map((record, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText primary={<CListText record={record} />} />
                  </ListItem>
                ))}
              </List>
            </div>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}

export default NotificationPopper;
