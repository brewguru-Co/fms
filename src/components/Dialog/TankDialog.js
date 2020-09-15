import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TankSchema } from "../../lib/formSchema";
import locale from "../../locale/ko_KR.json";
import styles from "../../assets/jss/components/dialogStyle";

const useStyles = makeStyles(styles);

const TANK = locale.TANK;

export default function TankDialog(props) {
  const { teas, tanks } = useSelector((state) => ({
    teas: state.teas.teas,
    tanks: state.tanks.tanks,
  }));
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;
  const [equal, setEqual] = useState(true);

  const handleSave = (values, { setSubmitting }) => {
    let tank = values;
    if (!isDuplicated(values.name)) {
      setSubmitting(false);
      onCreate(tank);
      setEqual(true);
      handleClose();
    }
  };

  const handleChangeTeaName = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    if (equal) {
      const selectedTea = teas.find((tea) => tea.name === value);
      setFieldValue("phLow", selectedTea.phLowOp);
      setFieldValue("tempLow", selectedTea.tempLowOp);
      setFieldValue("doLow", selectedTea.doLowOp);
      setFieldValue("brixLow", selectedTea.brixLowOp);

      setFieldValue("phHigh", selectedTea.phHighOp);
      setFieldValue("tempHigh", selectedTea.tempHighOp);
      setFieldValue("doHigh", selectedTea.doHighOp);
      setFieldValue("brixHigh", selectedTea.brixHighOp);
    }
  };

  const isDuplicated = (name) => {
    return tanks.filter((tank) => tank.name === name).length === 1;
  };

  if (!teas || teas.length < 1) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogContent>
          먼저 <b>품목</b>을 1개 이상 등록해주세요.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">탱크 설정 추가</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            teaName: teas[0].name,
            phLow: teas[0].phLowOp,
            phHigh: teas[0].phHighOp,
            tempLow: teas[0].tempLowOp,
            tempHigh: teas[0].tempHighOp,
            doLow: teas[0].doLowOp,
            doHigh: teas[0].doHighOp,
            brixLow: teas[0].brixLowOp,
            brixHigh: teas[0].brixHighOp,
          }}
          validationSchema={TankSchema}
          onSubmit={handleSave}
        >
          {({
            handleChange,
            submitForm,
            setFieldValue,
            isSubmitting,
            values,
            touched,
            errors,
          }) => (
            <Form>
              <Box className={classes.box} margin={1}>
                <TextField
                  type="text"
                  label="탱크명"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={
                    touched.name &&
                    (Boolean(errors.name) || isDuplicated(values.name))
                  }
                  helperText={
                    touched.name && (errors.name || isDuplicated(values.name))
                      ? errors.name || "중복 이름"
                      : ""
                  }
                />
                <TextField
                  select
                  name="teaName"
                  label="품목명"
                  onChange={(e) => handleChangeTeaName(e, setFieldValue)}
                  variant="standard"
                  value={values.teaName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.teaName && Boolean(errors.teaName)}
                  helperText={
                    touched.teaName && errors.teaName ? errors.teaName : ""
                  }
                >
                  {teas.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  className={classes.equal}
                  control={
                    <Checkbox
                      checked={equal}
                      onChange={() => setEqual(!equal)}
                      name="equal"
                    />
                  }
                  label="품목과 동일"
                />
              </Box>
              {!equal && (
                <Box className={classes.box} margin={1}>
                  <TextField
                    required
                    margin="dense"
                    name="phLow"
                    label={TANK.PH_LOW}
                    type="number"
                    onChange={handleChange}
                    error={touched.phLow && Boolean(errors.phLow)}
                    helperText={
                      touched.phLow && errors.phLow ? errors.phLow : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="phHigh"
                    label={TANK.PH_HIGH}
                    type="number"
                    onChange={handleChange}
                    error={touched.phHigh && Boolean(errors.phHigh)}
                    helperText={
                      touched.phHigh && errors.phHigh ? errors.phHigh : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="tempLow"
                    label={TANK.TEMP_LOW}
                    type="number"
                    onChange={handleChange}
                    error={touched.tempLow && Boolean(errors.tempLow)}
                    helperText={
                      touched.tempLow && errors.tempLow ? errors.tempLow : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="tempHigh"
                    label={TANK.TEMP_HIGH}
                    type="number"
                    onChange={handleChange}
                    error={touched.tempHigh && Boolean(errors.tempHigh)}
                    helperText={
                      touched.tempHigh && errors.tempHigh ? errors.tempHigh : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="doLow"
                    label={TANK.DO_LOW}
                    type="number"
                    onChange={handleChange}
                    error={touched.doLow && Boolean(errors.doLow)}
                    helperText={
                      touched.doLow && errors.doLow ? errors.doLow : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="doHigh"
                    label={TANK.DO_HIGH}
                    type="number"
                    onChange={handleChange}
                    error={touched.doHigh && Boolean(errors.doHigh)}
                    helperText={
                      touched.doHigh && errors.doHigh ? errors.doHigh : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="brixLow"
                    label={TANK.BRIX_LOW}
                    type="number"
                    onChange={handleChange}
                    error={touched.brixLow && Boolean(errors.brixLow)}
                    helperText={
                      touched.brixLow && errors.brixLow ? errors.brixLow : ""
                    }
                  />
                  <TextField
                    required
                    margin="dense"
                    name="brixHigh"
                    label={TANK.BRIX_HIGH}
                    type="number"
                    onChange={handleChange}
                    error={touched.brixHigh && Boolean(errors.brixHigh)}
                    helperText={
                      touched.brixHigh && errors.brixHigh ? errors.brixHigh : ""
                    }
                  />
                </Box>
              )}
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
