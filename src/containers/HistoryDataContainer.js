import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MultipleSelect from '../components/MultipleSelect';

function HistoryDataContainer() {
  const [selectedBatchs, setSelectedBatchs] = useState([]);

  const handleSelectedBatchs = (e) => {
    const { value } = e.target;
    setSelectedBatchs(value);
  };

  return (
    <Grid container spacing={1}>
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
        <Button variant='contained'>15분</Button>
        <Button variant='contained'>60분</Button>
        <Button variant='contained'>일</Button>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default HistoryDataContainer;
