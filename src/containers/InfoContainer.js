import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { GreasePencil, Thermometer, Water, Gauge } from 'mdi-material-ui';
import OptimalCard from '../components/OptimalCard';
import InfoCard from '../components/InfoCard';
import BatchUsageDialog from '../components/Dialog/BatchUsageDialog';
import { getTanks } from '../redux/modules/tanks';
import { getBatchs } from '../redux/modules/batchs';

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function InfoContainer(props) {
  const { handleFinish, handleStart } = props;
  const dispatch = useDispatch();
  const [startedAt, setStartedAt] = useState();
  const [finishedAt, setFinishedAt] = useState(null);
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [open, setOpen] = useState(false);
  const [useBatchData, setUseBatchData] = useState(false);
  const { tanks, tankDatas, batchs } = useSelector(
    (state) => ({
      tanks: state.tanks,
      tankDatas: state.tankDatas,
      batchs: state.batchs,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getTanks());
    dispatch(getBatchs());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = (now - startedAt) / 1000;
      setTime({
        day: formatTime(Math.floor(diff / 60 / 60 / 24)),
        hour: formatTime(Math.floor((diff / 60 / 60) % 24)),
        minute: formatTime(Math.floor((diff / 60) % 60)),
        second: formatTime(Math.floor(diff % 60)),
      });
    }, 1000);
    if (finishedAt) clearInterval(interval);
    return () => {
      if (!finishedAt) clearInterval(interval);
    };
  }, [startedAt, finishedAt]);

  useEffect(() => {
    if (batchs.batchs) {
      setStartedAt(batchs.batchs[batchs.batchs.length - 1].startedAt * 1000);
    }
  }, [batchs]);

  const onStart = () => {
    setFinishedAt(null);
    setStartedAt(new Date());
    handleStart();
  };

  const onFinish = () => {
    setFinishedAt(new Date());
    setOpen(true);
    handleFinish();
  };

  const onClose = (use) => {
    setUseBatchData(use);
    setOpen(false);
  };

  const realtimeData =
    tankDatas.realtimeTankData.length < 1
      ? {}
      : tankDatas.realtimeTankData[tankDatas.realtimeTankData.length - 1];
  const currentTank = !tanks.tanks ? {} : tanks.tanks[0];
  const currentBatch = !batchs.batchs ? {} : batchs.batchs[batchs.batchs.length - 1];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={4}>
        <InfoCard
          tank={currentTank.name}
          tea={currentTank.teaName}
          startedAt={currentBatch.startedAt}
          finishedAt={finishedAt}
          day={time.day}
          hour={time.hour}
          minute={time.minute}
          second={time.second}
          onStart={onStart}
          onFinish={onFinish}
        />
        <BatchUsageDialog open={open} handleClose={onClose} />
      </Grid>
      <Grid item xs={12} xl={8} container spacing={3}>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color='green'
            category='온도 (Temperature)'
            title={realtimeData.temp}
            content={`${currentTank.tempLow} ~ ${currentTank.tempHigh}`}
            icon={<Thermometer />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color='yellow'
            category='산도 (PH)'
            title={realtimeData.ph}
            content={`${currentTank.phLow} ~ ${currentTank.phHigh}`}
            icon={<GreasePencil />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color='red'
            category='당도 (BR)'
            title={realtimeData.brix}
            content={`${currentTank.brixLow} ~ ${currentTank.brixHigh}`}
            icon={<Water />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color='gray'
            category='용존산소량 (DO)'
            title={realtimeData.dox === 0 ? '0' : realtimeData.dox}
            content={`${currentTank.doxLow} ~ ${currentTank.doxHigh}`}
            icon={<Gauge />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(InfoContainer);
