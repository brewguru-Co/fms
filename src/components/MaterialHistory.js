import React from 'react';
import SortTable from './SortTable';
import { getTimeString } from '../lib/time';

const buildContent = (row) => {
  const { sugar, tea, spawn, subMaterials } = row;
  const sugarContent = `${sugar.name}: ${sugar.value}`;
  const teaContent = `${tea.name}: ${tea.value}`;
  const spawnContent = `${spawn.name}: ${spawn.value}`;
  const subMaterialsContent = subMaterials.reduce((str, sub) => {
    const { name, value } = sub;
    return str.concat(`/ ${name}: ${value}`);
  }, '');
  return `${sugarContent} / ${teaContent} / ${spawnContent} ${subMaterialsContent}`;
};

const formatTime = (rows) =>
  rows.map((row) => ({
    name: `${row.teaName} ${getTimeString(row.startedAt, 'YYYY-MM-DD')}`,
    content: buildContent(row),
    createdAt: getTimeString(row.createdAt, 'YYYY-MM-DD HH:MM:ss'),
  }));

const columns = [
  { id: 'name', numeric: true, label: '생산 제품' },
  { id: 'createdAt', numeric: false, label: '투입일' },
  { id: 'content', numeric: false, label: '투입 내용' },
];

function MaterialHistory(props) {
  const { data } = props;
  console.log(data);
  return (
    <SortTable
      rows={formatTime(data)}
      columns={columns}
      title='원료 투입 히스토리'
      color='gray'
      perPage={10}
    />
  );
}

export default MaterialHistory;
