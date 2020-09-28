import React from "react";
import Grid from "@material-ui/core/Grid";

import TeaManagementContainer from "../containers/TeaManagementContainer";
import TeaOffsetManagementContainer from "../containers/TeaOffsetManagementContainer";
import TankManagementContainer from "../containers/TankManagementContainer";
import NotificationTargetsContainer from "../containers/NotificationTargetsContainer";

function TeaManagementPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={7}>
        <TeaManagementContainer />
      </Grid>
      <Grid item xs={12} xl={5}>
        <TeaOffsetManagementContainer />
      </Grid>
      <Grid item xs={12} xl={7}>
        <TankManagementContainer />
      </Grid>
      <Grid item xs={12} xl={5}>
        <NotificationTargetsContainer />
      </Grid>
    </Grid>
  );
}

export default TeaManagementPage;
