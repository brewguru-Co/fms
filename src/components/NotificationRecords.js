import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "./Card/Card";
import CardBody from "./Card/CardBody";
import CardHeader from "./Card/CardHeader";
import CardFooter from "./Card/CardFooter";
import NotificationRecord from "./NotificationRecord";
import styles from "../assets/jss/components/notificationRecordsStyle";

const sortRecordsDesc = (records, key) => {
  const newRecords = _.cloneDeep(records);
  newRecords.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  return newRecords;
};

const useStyles = makeStyles(styles);

export default function NotificationRecords(props) {
  const { records } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="red">
        <h3 className={classes.title}>알림 히스토리</h3>
      </CardHeader>
      <CardBody>
        <Grid container spacing={1}>
          {sortRecordsDesc(records, "createdAt").map((record, index) => (
            <Grid item xs={12}>
              <NotificationRecord key={index} record={record} />
            </Grid>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
}
