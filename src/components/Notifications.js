import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "./Card/Card";
import CardBody from "./Card/CardBody";
import CardHeader from "./Card/CardHeader";
import Notification from "./Notification";
import { sortByKeyDesc } from "../lib/utils";
import styles from "../assets/jss/components/notificationsStyle";

const useStyles = makeStyles(styles);

export default function Notifications(props) {
  const { records } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="red">
        <h3 className={classes.title}>알림 히스토리</h3>
      </CardHeader>
      <CardBody>
        <Grid container spacing={1}>
          {sortByKeyDesc(records, "createdAt").map((record, index) => (
            <Grid key={index} item xs={12}>
              <Notification record={record} />
            </Grid>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
}