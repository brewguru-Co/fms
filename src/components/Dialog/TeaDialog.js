import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TeaSchema } from "../../lib/formSchema";
import styles from "../../assets/jss/components/dialogStyle";
import locale from "../../locale/ko_KR.json";

const TEA = locale.TEA;

const useStyles = makeStyles(styles);

export default function TeaDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate, teas } = props;

  const handleSave = (values, { setSubmitting }) => {
    if (!isDuplicated(values.name)) {
      setSubmitting(false);
      onCreate(values);
      handleClose();
    }
  };

  const isDuplicated = (name) => {
    return teas.filter((tea) => tea.name === name).length === 1;
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
            doxLowOp: null,
            doxHighOp: null,
            brixLowOp: null,
            brixHighOp: null,
          }}
          validationSchema={TeaSchema}
          onSubmit={handleSave}
        >
          {({
            handleChange,
            submitForm,
            isSubmitting,
            values,
            touched,
            errors,
          }) => (
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
                  error={
                    touched.name &&
                    (Boolean(errors.name) || isDuplicated(values.name))
                  }
                  helperText={
                    touched.name && errors.name
                      ? errors.name || TEA.DUPLICATED
                      : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="phLowOp"
                  label={TEA.PH_LOW_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.phLowOp && Boolean(errors.phLowOp)}
                  helperText={
                    touched.phLowOp && errors.phLowOp ? errors.phLowOp : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="phHighOp"
                  label={TEA.PH_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.phHighOp && Boolean(errors.phHighOp)}
                  helperText={
                    touched.phHighOp && errors.phHighOp ? errors.phHighOp : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="tempLowOp"
                  label={TEA.TEMP_LOW_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.tempLowOp && Boolean(errors.tempLowOp)}
                  helperText={
                    touched.tempLowOp && errors.tempLowOp
                      ? errors.tempLowOp
                      : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="tempHighOp"
                  label={TEA.TEMP_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.tempHighOp && Boolean(errors.tempHighOp)}
                  helperText={
                    touched.tempHighOp && errors.tempHighOp
                      ? errors.tempHighOp
                      : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="doxLowOp"
                  label={TEA.DO_LOW_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.doxLowOp && Boolean(errors.doxLowOp)}
                  helperText={
                    touched.doxLowOp && errors.doxLowOp ? errors.doxLowOp : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="doxHighOp"
                  label={TEA.DO_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.doxHighOp && Boolean(errors.doxHighOp)}
                  helperText={
                    touched.doxHighOp && errors.doxHighOp
                      ? errors.doxHighOp
                      : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="brixLowOp"
                  label={TEA.BRIX_LOW_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.brixLowOp && Boolean(errors.brixLowOp)}
                  helperText={
                    touched.brixLowOp && errors.brixLowOp
                      ? errors.brixLowOp
                      : ""
                  }
                />
                <TextField
                  required
                  margin="dense"
                  id="brixHighOp"
                  label={TEA.BRIX_HIGH_OP}
                  type="number"
                  onChange={handleChange}
                  error={touched.brixHighOp && Boolean(errors.brixHighOp)}
                  helperText={
                    touched.brixHighOp && errors.brixHighOp
                      ? errors.brixHighOp
                      : ""
                  }
                />
              </Box>
              <Box className={classes.box} margin={1}>
                <Button
                  variant="contained"
                  color="primary"
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
