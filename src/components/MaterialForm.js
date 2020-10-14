import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from '../assets/jss/components/materialFormStyle';

const useStyles = makeStyles(styles);

function MaterialForm(props) {
  const { onCreate } = props;
  const classes = useStyles();
  const [subNumber, setSubNumber] = useState([0]);

  const handleSave = (values, { setSubmitting }) => {
    setSubmitting(false);
    onCreate(values);
  };

  const increase = () => {
    setSubNumber([...subNumber, 0]);
  };
  const decrease = () => {
    const length = subNumber.length;
    if (length > 1) {
      setSubNumber(subNumber.slice(0, length - 1));
    }
  };

  return (
    <Formik
      initialValues={{
        sugar: {
          name: null,
          value: null,
        },
        tea: {
          name: null,
          value: null,
        },
        spawn: {
          name: null,
          value: null,
        },
        subMaterials: [
          {
            name: null,
            value: null,
          },
        ],
      }}
      // validationSchema={TeaSchema}
      onSubmit={handleSave}
    >
      {({ handleChange, submitForm, isSubmitting, values, touched, errors }) => (
        <Form>
          <Typography variant='h6'>주 원료</Typography>
          <Box className={classes.box} margin={1}>
            <TextField
              autoFocus
              required
              margin='dense'
              id='sugar.name'
              label='설탕 이름'
              type='text'
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='sugar.value'
              label='투입 용량'
              type='number'
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='tea.name'
              label='차 이름'
              type='text'
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='tea.value'
              label='투입 용량'
              type='number'
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='spawn.name'
              label='종균 스타터 이름'
              type='text'
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='spawn.value'
              label='투입 용량'
              type='number'
              onChange={handleChange}
            />
          </Box>
          <Typography variant='h6'>부 원료</Typography>
          <Box className={classes.box} margin={1}>
            {subNumber.map((value, index) => (
              <div key={index}>
                <TextField
                  required
                  margin='dense'
                  id={`subMaterials[${index}].name`}
                  label='부원료 이름'
                  type='text'
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin='dense'
                  id={`subMaterials[${index}].value`}
                  label='투입 용량'
                  type='number'
                  onChange={handleChange}
                />
              </div>
            ))}
          </Box>
          <Box className={classes.box} margin={1}>
            <Button variant='contained' onClick={increase}>
              부원료 추가
            </Button>
            <Button variant='contained' onClick={decrease}>
              부원료 삭제
            </Button>
            <Button variant='contained' color='primary' onClick={submitForm}>
              저장
            </Button>
            <Button variant='contained' color='secondary'>
              취소
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default MaterialForm;
