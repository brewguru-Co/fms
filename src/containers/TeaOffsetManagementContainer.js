import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CIndicator from '../components/CIndicator';
import EditableTable from '../components/EditableTable';
import {
  getTeaOffsets,
  removeTeaOffset,
  updateTeaOffset,
  createTeaOffset,
} from '../redux/modules/teaOffsets';
import { teaOffsetValidator } from '../lib/formSchema';
import locale from '../locale/ko_KR.json';

const TEA_OFFSET = locale.TEA_OFFSET;
const columns = [
  {
    id: 'teaName',
    type: 'text',
    disablePadding: true,
    label: TEA_OFFSET.TEA_NAME,
  },
  {
    id: 'ph',
    type: 'number',
    disablePadding: true,
    label: TEA_OFFSET.PH,
  },
  {
    id: 'temp',
    type: 'number',
    disablePadding: true,
    label: TEA_OFFSET.TEMP,
  },
  {
    id: 'dox',
    type: 'number',
    disablePadding: true,
    label: TEA_OFFSET.DOX,
  },
  {
    id: 'brix',
    type: 'number',
    disablePadding: true,
    label: TEA_OFFSET.BRIX,
  },
];

function TeaOffsetManagementContainer() {
  const { loading, error, teaOffsets: data } = useSelector((state) => state.teaOffsets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeaOffsets());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeTeaOffset(id));
  const onUpdate = (teaOffset) => dispatch(updateTeaOffset(teaOffset));
  const onCreate = (teaOffset) => dispatch(createTeaOffset(teaOffset));

  if (error) return <div>Aysnc Error 발생</div>;
  if (loading || !data) return <CIndicator />;

  return (
    <EditableTable
      columns={columns}
      rows={data}
      title='품목 오프셋 설정'
      subTitle='오류 체크 알고리즘에서 사용되는 오프셋'
      onRemove={onRemove}
      onUpdate={onUpdate}
      onCreate={onCreate}
      dialog='teaOffset'
      validator={teaOffsetValidator}
      color='gray'
    />
  );
}

export default TeaOffsetManagementContainer;
