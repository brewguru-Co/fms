import React from 'react';
import SortTable from '../components/SortTable';
import { getTimeString } from '../lib/time';

const formatTime = (rows) =>
  rows.map((row) => ({
    ...row,
    createdAt: getTimeString(row.createdAt, 'YYYY-MM-DD HH:MM:ss'),
  }));

const columns = [
  { id: 'createdAt', numeric: true, label: '오류일 (년월일)' },
  { id: 'message', numeric: false, label: '내용' },
  { id: 'action', numeric: false, label: '조치 내용' },
];

function Notifications(props) {
  const { data } = props;
  return (
    <SortTable
      rows={formatTime(data)}
      columns={columns}
      title='생산완료품 오류 히스토리'
      color='red'
      perPage={10}
    />
  );
}

export default Notifications;
