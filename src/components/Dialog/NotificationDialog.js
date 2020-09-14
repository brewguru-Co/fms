import React from "react";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/dialogStyle";
import locale from "../../locale/ko_KR.json";

const useStyles = makeStyles(styles);

const NOTIFICATION = locale.NOTIFICATION;

export default function NotificationDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;

  const handleSave = (values, { setSubmitting }) => {
    setSubmitting(false);
    onCreate(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">알림 추가</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            on: true,
          }}
          onSubmit={handleSave}
        >
          {({ handleChange, submitForm, isSubmitting, values, errors }) => (
            <Form>
              <Box className={classes.box} margin={1}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label={NOTIFICATION.NAME}
                  type="text"
                  helperText=" "
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="email"
                  label={NOTIFICATION.EMAIL}
                  type="email"
                  helperText=" "
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="phone"
                  label={NOTIFICATION.PHONE}
                  type="tel"
                  helperText="010-0000-0000"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={values.on}
                      id="on"
                      type="checkbox"
                      onChange={handleChange}
                    />
                  }
                  label="알림"
                  labelPlacement="top"
                />
              </Box>
              <Box className={classes.box} margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  저장
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="secondary"
                >
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
