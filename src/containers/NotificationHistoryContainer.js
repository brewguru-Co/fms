import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SortTable from '../components/SortTable';
import { getTimeString } from '../lib/time';
import { sortByKeyDesc } from '../lib/utils';
import { getNotifications } from '../redux/modules/notifications';
import { getBatchs } from '../redux/modules/batchs';

function groupByBatchId(arr) {
  return arr.reduce((acc, { batchId, code }) => {
    if (!acc.has(batchId)) {
      return acc.set(batchId, {
        [code]: 1,
      });
    }
    const current = acc.get(batchId);
    return acc.set(batchId, {
      ...current,
      [code]: current[code] ? current[code] + 1 : 1,
    });
  }, new Map());
}

const buildRows = (notifications, batchs) => {
  const getBatch = (batchId) => batchs.find((batch) => batch.id === batchId);
  const notificationsGroupByBatchId = groupByBatchId(notifications);
  const rows = [];
  for (let [key, value] of notificationsGroupByBatchId.entries()) {
    const totalErrorCount = Object.values(value).reduce((sum, value) => sum + value);
    const batch = getBatch(key);
    rows.push({
      createdAt: getTimeString(batch.startedAt, 'YYYY-MM-DD'),
      teaName: batch.teaName,
      count: totalErrorCount,
    });
  }
  return sortByKeyDesc(rows, 'createdAt');
};

const columns = [
  { id: 'createdAt', numeric: false, label: '제조일 (년월일)' },
  { id: 'teaName', numeric: false, label: '품목명' },
  { id: 'count', numeric: true, label: '총 발생 횟수' },
];

function NotificationTargetHistoryContainer() {
  const { batchs, notifications } = useSelector((state) => ({
    batchs: state.batchs.batchs,
    notifications: state.notifications.notifications,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getBatchs());
  }, [dispatch]);

  return (
    <>
      {notifications && batchs && (
        <SortTable
          rows={buildRows(notifications, batchs)}
          columns={columns}
          title='오류 알림 히스토리'
          color='red'
        />
      )}
    </>
  );
}

export default NotificationTargetHistoryContainer;
