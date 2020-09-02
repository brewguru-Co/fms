import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import NotificationRecord from "./NotificationRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function NotificationRecords(props) {
  const classes = useStyles();
  const { records } = props;

  return (
    <List className={classes.root}>
      {records.map((record, index) => (
        <>
          <NotificationRecord record={record} />
          {index !== records.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </>
      ))}
    </List>
  );
}
