import React from "react";
import Grid from "@material-ui/core/Grid";

import NotificationTargetsContainer from "../containers/NotificationTargetsContainer";
import NotificationsContainer from "../containers/NotificationsContainer";

function NotificationPage() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={7}>
        <NotificationTargetsContainer />
      </Grid>
      <Grid item xs={5}>
        <NotificationsContainer />
      </Grid>
    </Grid>
  );
}

export default NotificationPage;
