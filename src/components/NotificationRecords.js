import React from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import NotificationRecord from "./NotificationRecord";

const sortRecordsDesc = (records, key) => {
  const newRecords = _.cloneDeep(records);
  newRecords.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  return newRecords;
};

export default function NotificationRecords(props) {
  const { records } = props;

  console.log(records);

  return (
    <Grid container spacing={1}>
      {sortRecordsDesc(records, "createdAt").map((record, index) => (
        <Grid item xs={12}>
          <NotificationRecord key={index} record={record} />
        </Grid>
      ))}
    </Grid>
  );
}
