import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Notifications from '../components/Notifications';
import TotalNotifications from '../components/TotalNotifications';
import CIndicator from '../components/CIndicator';
import { getNotifications } from '../redux/modules/notifications';
import { getBatchs } from '../redux/modules/batchs';
import { sortByKeyDesc } from '../lib/utils';
import { getErrorType, getErrorMeesage } from '../lib/error';

function merge(notifications, batchs) {
  const obj = batchs.reduce(
    (acc, batch) => ({
      ...acc,
      [batch.id]: {
        id: batch.id,
        startedAt: batch.startedAt,
        teaName: batch.teaName,
        ph: 0,
        dox: 0,
        temp: 0,
        brix: 0,
        errors: [],
      },
    }),
    {},
  );

  for (let i = 0; i < notifications.length; i += 1) {
    const notification = notifications[i];
    const { batchId, code } = notification;
    obj[batchId].errors.push(notification);
    obj[batchId][getErrorType(code)] += 1;
  }

  return obj;
}

function toNotificationData(data, id) {
  if (id === 'None') {
    return [];
  }
  return data[id].errors.map((error) => {
    const { code, min, max, value, action, createdAt } = error;
    return {
      createdAt,
      message: getErrorMeesage(code, min, max, value),
      action,
    };
  });
}

const getMenuItems = (data) => {
  return sortByKeyDesc(data, 'startedAt').reduce((acc, element) => {
    const { id, startedAt, teaName } = element;
    acc.push({
      key: id,
      value: `${teaName} ${moment(startedAt * 1000).format('YYYY-MM-DD')}`,
    });
    return acc;
  }, []);
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 300,
    maxWidth: '80vw',
  },
}));

function NotificationsContainer() {
  const [selectedBatch, setSelectedBatch] = useState('None');
  const { notifications, batchs } = useSelector((state) => ({
    notifications: state.notifications.notifications,
    batchs: state.batchs.batchs,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getBatchs());
  }, [dispatch]);

  const handleSelect = (e) => {
    setSelectedBatch(e.target.value);
  };

  if (!notifications || !batchs) {
    return <CIndicator />;
  }

  const data = merge(notifications, batchs);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel>생산 완료 제품</InputLabel>
          <Select value={selectedBatch} onChange={handleSelect}>
            {getMenuItems(Object.values(data)).map(({ key, value }) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
            <MenuItem key={'None'} value='None'>
              None
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={7}>
        <TotalNotifications data={Object.values(data)} />
      </Grid>
      <Grid item xs={5}>
        <Notifications data={toNotificationData(data, selectedBatch)} />
      </Grid>
    </Grid>
  );
}

export default NotificationsContainer;
