import React from 'react';
import Grid from '@material-ui/core/Grid';
import HistoryDataContainer from '../containers/HistoryDataContainer';

function HistoryDataPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HistoryDataContainer />
      </Grid>
    </Grid>
  );
}

export default HistoryDataPage;
