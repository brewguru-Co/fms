import React from "react";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/dialogStyle";
import locale from "../../locale/ko_KR.json";

const useStyles = makeStyles(styles);

const TEA = locale.TEA;

export default function TeaDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;

  const handleSave = (values, { setSubmitting }) => {
    setSubmitting(false);
    onCreate(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">관리 품목 추가</DialogTitle>
      <DialogContent className={classes.box}>
        <Formik
          initialValues={{
            name: "",
            phLowOp: null,
            phHighOp: null,
            tempLowOp: null,
            tempHighOp: null,
            doLowOp: null,
            doHighOp: null,
            brixLowOp: null,
            brixHighOp: null,
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
                  label={TEA.NAME}
                  type="text"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="phLowOp"
                  label={TEA.PH_LOW_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="phHighOp"
                  label={TEA.PH_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="tempLowOp"
                  label={TEA.TEMP_LOW_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="tempHighOp"
                  label={TEA.TEMP_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="doLowOp"
                  label={TEA.DO_LOW_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="doHighOp"
                  label={TEA.DO_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="brixLowOp"
                  label={TEA.BRIX_LOW_OP}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  required
                  margin="dense"
                  id="brixHighOp"
                  label={TEA.BRIX_HIGH_OP}
                  type="number"
                  onChange={handleChange}
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
                  onClick={handleClose}
                  variant="contained"
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
