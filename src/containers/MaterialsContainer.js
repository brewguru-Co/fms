import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MaterialForm from '../components/MaterialForm';
import MaterialHistory from '../components/MaterialHistory';
import CIndicator from '../components/CIndicator';
import { getMaterials, createMaterial } from '../redux/modules/materials';
import { getBatchs } from '../redux/modules/batchs';
import { getCurrentBatch } from '../lib/utils';

function merge(materials, batchs) {
  return materials.map((material) => {
    const batch = batchs.find((batch) => batch.id === material.batchId);
    return {
      teaName: batch.teaName,
      tankName: batch.tankName,
      startedAt: batch.startedAt,
      ...material,
    };
  });
}

function MaterialsContainer() {
  const { batchs, materials } = useSelector((state) => ({
    batchs: state.batchs.batchs,
    materials: state.materials.materials,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getBatchs());
  }, [dispatch]);

  const onCreate = (values) => {
    const { id } = getCurrentBatch(batchs);
    const now = Math.floor(Date.now() / 1000);
    dispatch(createMaterial({ batchId: id, createdAt: now, ...values }));
  };

  if (!batchs || !materials) return <CIndicator />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MaterialForm onCreate={onCreate} />
      </Grid>
      <Grid item xs={12}>
        <MaterialHistory data={merge(materials, batchs)} />
      </Grid>
    </Grid>
  );
}

export default MaterialsContainer;
