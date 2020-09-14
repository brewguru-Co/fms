import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
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
import { makeStyles } from "@material-ui/core/styles";
import locale from "../../locale/ko_KR.json";
import styles from "../../assets/jss/components/dialogStyle";

const useStyles = makeStyles(styles);

const TANK = locale.TANK;

export default function TankDialog(props) {
  const { teas } = useSelector((state) => state.teas);
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;
  const [equal, setEqual] = useState(true);

  const handleSave = (values, { setSubmitting }) => {
    let tank = values;
    setSubmitting(false);
    if (equal) {
      const selectedTea = teas.find((tea) => tea.name === values.teaName);
      tank = {
        name: values.name,
        teaName: values.teaName,
        phLow: selectedTea.phLowOp,
        phHigh: selectedTea.phHighOp,
        tempLow: selectedTea.tempLowOp,
        tempHigh: selectedTea.tempHighOp,
        doLow: selectedTea.doLowOp,
        doHigh: selectedTea.doHighOp,
        brixLow: selectedTea.brixLowOp,
        brixHigh: selectedTea.brixHighOp,
      };
    }
    onCreate(tank);
    setEqual(true);
    handleClose();
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
            phLow: null,
            phHigh: null,
            tempLow: null,
            tempHigh: null,
            doLow: null,
            doHigh: null,
            brixLow: null,
            brixHigh: null,
          }}
          onSubmit={handleSave}
        >
          {({ handleChange, submitForm, isSubmitting, values, errors }) => (
            <Form>
              <Box className={classes.box} margin={1}>
                <TextField
                  type="text"
                  label="탱크명"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <TextField
                  select
                  name="teaName"
                  label="품목명"
                  onChange={handleChange}
                  variant="standard"
                  value={values.teaName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 120 }}
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
                  />
                  <TextField
                    required
                    margin="dense"
                    name="phHigh"
                    label={TANK.PH_HIGH}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="tempLow"
                    label={TANK.TEMP_LOW}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="tempHigh"
                    label={TANK.TEMP_HIGH}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="doLow"
                    label={TANK.DO_LOW}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="doHigh"
                    label={TANK.DO_HIGH}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="brixLow"
                    label={TANK.BRIX_LOW}
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="brixHigh"
                    label={TANK.BRIX_HIGH}
                    type="number"
                    onChange={handleChange}
                  />
                </Box>
              )}
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
