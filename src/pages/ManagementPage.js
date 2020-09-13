import React from "react";
import Grid from "@material-ui/core/Grid";

import TeaManagementContainer from "../containers/TeaManagementContainer";
import TankManagementContainer from "../containers/TankManagementContainer";

function TeaManagementPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TeaManagementContainer />
      </Grid>
      <Grid item xs={12}>
        <TankManagementContainer />
      </Grid>
    </Grid>
  );
}

export default TeaManagementPage;
