import React from 'react';
import SortTable from '../components/SortTable';
import { getTimeString } from '../lib/time';

const formatTime = (rows) =>
  rows.map((row) => ({
    ...row,
    startedAt: getTimeString(row.startedAt, 'YYYY-MM-DD'),
  }));

const columns = [
  { id: 'startedAt', numeric: true, label: '제조일 (년월일)' },
  { id: 'teaName', numeric: false, label: '품목명' },
  { id: 'ph', numeric: true, label: 'PH 횟수' },
  { id: 'dox', numeric: true, label: 'DO 횟수' },
  { id: 'temp', numeric: true, label: '온도 횟수' },
  { id: 'brix', numeric: true, label: 'BR 횟수' },
];

function TotalNotifications(props) {
  const { data } = props;
  return (
    <SortTable
      rows={formatTime(data)}
      columns={columns}
      title='생산완료품 오류 히스토리 (종합)'
      color='orange'
      perPage={10}
    />
  );
}

export default TotalNotifications;
