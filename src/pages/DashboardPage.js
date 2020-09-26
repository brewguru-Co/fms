import React from "react";
import Grid from "@material-ui/core/Grid";
import RealtimeChartsContainer from "../containers/RealtimeChartsContainer";
import InfoContainer from "../containers/InfoContainer";
import ProductHistoryContainer from "../containers/ProductHistoryContainer";
import NotificationHistoryContainer from "../containers/NotificationHistoryContainer";

function DashboardPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InfoContainer />
      </Grid>
      <Grid item xs={12}>
        <RealtimeChartsContainer />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductHistoryContainer />
      </Grid>
      <Grid item xs={12} md={6}>
        <NotificationHistoryContainer />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
