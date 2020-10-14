import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CIndicator from '../components/CIndicator';
import MultipleSelect from '../components/MultipleSelect';
import PhHistoryChart from '../components/Chart/PhHistoryChart';
import DoHistoryChart from '../components/Chart/DoHistoryChart';
import TempHistoryChart from '../components/Chart/TempHistoryChart';
import BrHistoryChart from '../components/Chart/BrHistoryChart';
import { getBatchDatas } from '../redux/modules/batchDatas';
import { getTeas } from '../redux/modules/teas';
import { filterData, getOptimalData } from '../lib/chart';
import styles from '../assets/jss/components/historyDataContainerStyle';

const useStyles = makeStyles(styles);

const formatData = (data, key) => {
  return data.map((e) =>
    e.map((e, index) => ({
      x: index,
      y: e[key],
    })),
  );
};

const getSelectedData = (batchDatas, items) => {
  const selected = items.map((e) => e.split(' ')[1]);
  return batchDatas
    .filter((batchData) => {
      const startedAt = moment(batchData.startedAt * 1000).format('YYYY-MM-DD');
      return selected.includes(startedAt);
    })
    .map((batchData) => batchData.data);
};

const buildItems = (batchDatas) => {
  return batchDatas.reduce((acc, batchData) => {
    const { startedAt, teaName } = batchData;
    acc.push(`${teaName} ${moment(startedAt * 1000).format('YYYY-MM-DD')}`);
    return acc;
  }, []);
};

function HistoryDataContainer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { teas, batchDatas } = useSelector((state) => ({
    batchDatas: state.batchDatas.batchDatas,
    teas: state.teas.teas,
  }));
  const [unit, setUnit] = useState();
  const [items, setItems] = useState([]);
  const [selectedBatchs, setSelectedBatchs] = useState([]);

  const [seriesData, setSeriesData] = useState();
  const [selectedSeriesData, setSelectedSeriesData] = useState();
  const [optimalData, setOptimalData] = useState();
  const [isOptimal, setIsOptimal] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getBatchDatas());
    dispatch(getTeas());
  }, [dispatch]);

  const handleSelectedBatchs = (e) => {
    const { value } = e.target;
    setSelectedBatchs(value);
    setSelectedSeriesData(getSelectedData(seriesData, value));
    setData();
  };

  const handleSeries = (name) => {
    setData();
    setSelectedBatchs([]);

    const filtered = batchDatas.filter((batchData) => batchData.teaName === name);

    setSeriesData(filtered);
    setItems(buildItems(filtered));
  };

  const handleData = (unit) => {
    if (!batchDatas || selectedBatchs.length < 1) return;
    const optimal = getOptimalData(selectedSeriesData);
    const viewData = [...selectedSeriesData, optimal];

    setOptimalData(optimal);
    setUnit(unit);
    setIsOptimal(false);

    switch (unit) {
      case 'day':
        setData(viewData.map((e) => filterData(e, 'day')));
        break;
      default:
        setData(viewData);
    }
  };

  const handleOptimalData = () => {
    setData([filterData(optimalData, unit)]);
    setIsOptimal(true);
  };

  if (!teas || !batchDatas) {
    return <CIndicator />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className={classes.box}>
          {teas.map((tea) => (
            <Button onClick={() => handleSeries(tea.name)} variant='contained' size='small'>
              {tea.name}
            </Button>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <MultipleSelect
          onChange={handleSelectedBatchs}
          values={selectedBatchs}
          items={items}
          label='제품 선택'
        />
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.box}>
          <Button onClick={() => handleData('hour')} variant='contained' size='small'>
            60분
          </Button>
          <Button onClick={() => handleData('day')} variant='contained' size='small'>
            일
          </Button>
          <Button
            onClick={() => handleOptimalData()}
            variant='contained'
            size='small'
            color='primary'
          >
            최적값
          </Button>
        </Box>
      </Grid>
      {data && (
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant='h5'>
              온도 (Temperature)
            </Typography>
            <TempHistoryChart datas={formatData(data, 'temp')} isOptimal={isOptimal} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant='h5'>
              산도 (PH)
            </Typography>
            <PhHistoryChart datas={formatData(data, 'ph')} isOptimal={isOptimal} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant='h5'>
              용존산소량 (DO)
            </Typography>
            <DoHistoryChart datas={formatData(data, 'dox')} isOptimal={isOptimal} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant='h5'>
              당도 (BR)
            </Typography>
            <BrHistoryChart datas={formatData(data, 'brix')} isOptimal={isOptimal} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default HistoryDataContainer;
