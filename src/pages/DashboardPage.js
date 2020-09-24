import React from "react";
import Grid from "@material-ui/core/Grid";
import RealtimeChartsContainer from "../containers/RealtimeChartsContainer";
import InfoContainer from "../containers/InfoContainer";

function DashboardPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InfoContainer />
      </Grid>
      <Grid item xs={12}>
        <RealtimeChartsContainer />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
