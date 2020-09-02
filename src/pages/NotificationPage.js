import React from "react";
import Grid from "@material-ui/core/Grid";

import NotificationContainer from "../containers/NotificationContainer";
import NotificationRecordsContainer from "../containers/NotificationRecordsContainer";

function NotificationPage() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={7}>
        <NotificationContainer />
      </Grid>
      <Grid item xs={5}>
        <NotificationRecordsContainer />
      </Grid>
    </Grid>
  );
}

export default NotificationPage;
