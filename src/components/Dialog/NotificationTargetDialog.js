import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NotificationTargetSchema } from '../../lib/formSchema';
import styles from '../../assets/jss/components/notificationTargetDialogStyle';
import locale from '../../locale/ko_KR.json';

const useStyles = makeStyles(styles);
const NOTIFICATION = locale.NOTIFICATION;

export default function NotificationDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;

  const handleSave = (values, { setSubmitting }) => {
    setSubmitting(false);
    handleClose();
    onCreate(values);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl'>
      <DialogTitle id='form-dialog-title'>알림 추가</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            on: true,
          }}
          validationSchema={NotificationTargetSchema}
          onSubmit={handleSave}
        >
          {({ handleChange, submitForm, isSubmitting, values, touched, errors }) => (
            <Form>
              <Box className={classes.box} margin={1}>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  name='name'
                  label={NOTIFICATION.NAME}
                  type='text'
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : ''}
                >
                  {errors.name}
                </TextField>
                <TextField
                  margin='dense'
                  name='email'
                  label={NOTIFICATION.EMAIL}
                  type='email'
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email ? errors.email : ''}
                >
                  {errors.email}
                </TextField>
                <TextField
                  margin='dense'
                  name='phone'
                  label={NOTIFICATION.PHONE}
                  type='tel'
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone ? errors.phone : '-없이 입력'}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={values.on}
                      id='on'
                      type='checkbox'
                      onChange={handleChange}
                    />
                  }
                  label='알림'
                  labelPlacement='top'
                />
              </Box>
              <Box className={classes.box} margin={1}>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  저장
                </Button>
                <Button variant='contained' onClick={handleClose} color='secondary'>
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
