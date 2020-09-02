import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "black",
  },
  inline: {
    display: "inline",
  },
}));

function NotificationRecord(props) {
  const classes = useStyles();
  const { record } = props;
  const { code, content, createdAt } = record;
  const { high, low, value } = content;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <Typography className={classes.title} variant="body1">
            {code}
          </Typography>
        }
        secondary={
          <>
            <Typography variant="body2">
              {`측정값: ${value} (${low} ~ ${high})`}
            </Typography>
            {createdAt}
          </>
        }
      />
    </ListItem>
  );
}

export default NotificationRecord;
