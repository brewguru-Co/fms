import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MultipleSelect from '../components/MultipleSelect';
import PhHistoryChart from '../components/Chart/PhHistoryChart';
import DoHistoryChart from '../components/Chart/DoHistoryChart';
import TempHistoryChart from '../components/Chart/TempHistoryChart';
import BrHistoryChart from '../components/Chart/BrHistoryChart';
import { getBatchDatas } from '../redux/modules/batchDatas';
import { filterData } from '../lib/chart';
import { Typography } from '@material-ui/core';
import styles from '../assets/jss/components/historyDataContainerStyle';

const useStyles = makeStyles(styles)

const formatData = (data, key) => {
  return data.map((e) =>
    e.map((e, index) => ({
      x: index,
      y: e[key],
    }))
  );
};

const convert = (batchDatas, selected) => {
  return selected.map((e) => batchDatas[e]);
};

const fakeSelected = (length) => {
  return Array(length)
    .fill(1)
    .map((e, index) => index + 1);
};

function HistoryDataContainer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { batchDatas } = useSelector((state) => state.batchDatas);
  const [selectedBatchs, setSelectedBatchs] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getBatchDatas());
  }, [dispatch]);

  const handleSelectedBatchs = (e) => {
    const { value } = e.target;
    setSelectedBatchs(value);
    setData();
  };

  const handleData = (unit) => {
    if (!batchDatas || selectedBatchs.length < 1) return;
    switch (unit) {
      case 'hour':
        setData(
          convert(batchDatas, fakeSelected(selectedBatchs.length)).map((e) =>
            filterData(e, 'hour')
          )
        );
        break;
      case 'day':
        setData(
          convert(batchDatas, fakeSelected(selectedBatchs.length)).map((e) =>
            filterData(e, 'day')
          )
        );
        break;
      default:
        setData(convert(batchDatas, fakeSelected(selectedBatchs.length)));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MultipleSelect
          onChange={handleSelectedBatchs}
          values={selectedBatchs}
          items={[
            '2020.08.21 ~ 2020.09.13',
            '2020.07.21 ~ 2020.08.13',
            '2020.06.21 ~ 2020.07.13',
            '2020.05.21 ~ 2020.08.13',
          ]}
          label='제품 선택'
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handleData()} variant='contained' size="small">
          15분
        </Button>
        <Button onClick={() => handleData('hour')} variant='contained' size="small">
          60분
        </Button>
        <Button onClick={() => handleData('day')} variant='contained' size="small">
          일
        </Button>
      </Grid>
      <Grid item xs={12}>
        {data && (
          <>
            <Typography className={classes.title} variant='h5'>온도 (Temperature)</Typography>
            <TempHistoryChart datas={formatData(data, 'temp')} />
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {data && (
          <>
            <Typography className={classes.title} variant='h5'>산도 (PH)</Typography>
            <PhHistoryChart datas={formatData(data, 'ph')} />
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {data && (
          <>
            <Typography className={classes.title} variant='h5'>용존산소량 (DO)</Typography>
            <DoHistoryChart datas={formatData(data, 'dox')} />
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {data && (
          <>
            <Typography className={classes.title} variant='h5'>당도 (BR)</Typography>
            <BrHistoryChart datas={formatData(data, 'brix')} />
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default HistoryDataContainer;
