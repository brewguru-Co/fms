import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TeaOffsetSchema } from '../../lib/formSchema';
import { getTeaIdByName } from '../../lib/utils';
import locale from '../../locale/ko_KR.json';
import styles from '../../assets/jss/components/dialogStyle';

const useStyles = makeStyles(styles);

const TEA_OFFSET = locale.TEA_OFFSET;

export default function TeaOffsetDialog(props) {
  const { teas } = useSelector((state) => state.teas);
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;

  const handleSave = (values, { setSubmitting }) => {
    let teaOffset = values;
    setSubmitting(false);
    handleClose();
    onCreate({ ...teaOffset, teaId: getTeaIdByName(teas, teaOffset.teaName) });
  };

  if (!teas || teas.length < 1) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth='xl'>
        <DialogContent>
          먼저 <b>품목</b>을 1개 이상 등록해주세요.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl'>
      <DialogTitle id='form-dialog-title'>품목 오프셋 추가</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            teaName: teas[0].name,
            ph: null,
            temp: null,
            dox: null,
            brix: null,
          }}
          validationSchema={TeaOffsetSchema}
          onSubmit={handleSave}
        >
          {({ handleChange, submitForm, values, touched, errors }) => (
            <Form>
              <Box className={classes.box} margin={1}>
                <TextField
                  select
                  name='teaName'
                  label={TEA_OFFSET.TEA_NAME}
                  onChange={handleChange}
                  variant='standard'
                  value={values.teaName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.teaName && Boolean(errors.teaName)}
                  helperText={touched.teaName && errors.teaName ? errors.teaName : ''}
                >
                  {teas.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  margin='dense'
                  name='ph'
                  label={TEA_OFFSET.PH}
                  type='number'
                  onChange={handleChange}
                  error={touched.ph && Boolean(errors.ph)}
                  helperText={touched.ph && errors.ph ? errors.ph : ''}
                />
                <TextField
                  required
                  margin='dense'
                  name='temp'
                  label={TEA_OFFSET.TEMP}
                  type='number'
                  onChange={handleChange}
                  error={touched.temp && Boolean(errors.temp)}
                  helperText={touched.temp && errors.temp ? errors.temp : ''}
                />
                <TextField
                  required
                  margin='dense'
                  name='dox'
                  label={TEA_OFFSET.DOX}
                  type='number'
                  onChange={handleChange}
                  error={touched.dox && Boolean(errors.dox)}
                  helperText={touched.dox && errors.dox ? errors.dox : ''}
                />
                <TextField
                  required
                  margin='dense'
                  name='brix'
                  label={TEA_OFFSET.BRIX}
                  type='number'
                  onChange={handleChange}
                  error={touched.brix && Boolean(errors.brix)}
                  helperText={touched.brix && errors.brix ? errors.brix : ''}
                />
              </Box>
              <Box className={classes.box} margin={1}>
                <Button variant='contained' color='primary' onClick={submitForm}>
                  저장
                </Button>
                <Button onClick={handleClose} variant='contained' color='secondary'>
                  취소
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
