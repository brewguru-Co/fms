import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CIndicator from '../components/CIndicator';
import EditableTable from '../components/EditableTable';
import { getTeas, removeTea, updateTea, createTea } from '../redux/modules/teas';
import { teaValidator } from '../lib/formSchema';
import locale from '../locale/ko_KR.json';

const TEA = locale.TEA;
const columns = [
  { id: 'name', type: 'text', disablePadding: true, label: TEA.NAME },
  {
    id: 'phLowOp',
    type: 'number',
    disablePadding: true,
    label: TEA.PH_LOW_OP,
  },
  {
    id: 'phHighOp',
    type: 'number',
    disablePadding: true,
    label: TEA.PH_HIGH_OP,
  },
  {
    id: 'tempLowOp',
    type: 'number',
    disablePadding: true,
    label: TEA.TEMP_LOW_OP,
  },
  {
    id: 'tempHighOp',
    type: 'number',
    disablePadding: true,
    label: TEA.TEMP_HIGH_OP,
  },
  {
    id: 'doxLowOp',
    type: 'number',
    disablePadding: true,
    label: TEA.DO_LOW_OP,
  },
  {
    id: 'doxHighOp',
    type: 'number',
    disablePadding: true,
    label: TEA.DO_HIGH_OP,
  },
  {
    id: 'brixLowOp',
    type: 'number',
    disablePadding: true,
    label: TEA.BRIX_LOW_OP,
  },
  {
    id: 'brixHighOp',
    type: 'number',
    disablePadding: true,
    label: TEA.BRIX_HIGH_OP,
  },
];

function TeaManagementContainer() {
  const { loading, error, teas: data } = useSelector((state) => state.teas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeas());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeTea(id));
  const onUpdate = (tea) => dispatch(updateTea(tea));
  const onCreate = (tea) => dispatch(createTea(tea));

  if (error) return <div>Aysnc Error 발생</div>;
  if (loading || !data) return <CIndicator />;

  return (
    <EditableTable
      columns={columns}
      rows={data}
      title='품목 설정'
      subTitle='품목 별 최적 범위 기록'
      onRemove={onRemove}
      onUpdate={onUpdate}
      onCreate={onCreate}
      dialog='tea'
      validator={teaValidator}
      color='indigo'
    />
  );
}

export default TeaManagementContainer;
