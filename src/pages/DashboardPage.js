import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import RealtimeChartsContainer from '../containers/RealtimeChartsContainer';
import InfoContainer from '../containers/InfoContainer';
import BatchHistoryContainer from '../containers/BatchHistoryContainer';
import NotificationHistoryContainer from '../containers/NotificationHistoryContainer';

function DashboardPage() {
  const [isFinished, setIsFinished] = useState(false);
  const onStart = () => {
    setIsFinished(false);
  };
  const onFinish = () => {
    setIsFinished(true);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InfoContainer handleStart={onStart} handleFinish={onFinish} />
      </Grid>
      <Grid item xs={12}>
        <RealtimeChartsContainer isFinished={isFinished} />
      </Grid>
      <Grid item xs={12} md={6}>
        <BatchHistoryContainer />
      </Grid>
      <Grid item xs={12} md={6}>
        <NotificationHistoryContainer />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
