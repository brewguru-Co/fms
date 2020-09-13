import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import locale from "../locale/ko_KR.json";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const TANK = locale.TANK;

export default function TankDialog(props) {
  const { teas } = useSelector((state) => state.teas);
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;
  const [tank, setTank] = useState({});

  const onChange = (e) => {
    const { id, type, value } = e.target;
    setTank({
      ...tank,
      [id]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSave = () => {
    onCreate(tank);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">탱크 설정 추가</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label={TANK.NAME}
          type="text"
          onChange={onChange}
        />
        <InputLabel>{TANK.TEA_NAME}</InputLabel>
        <Select>
          {teas &&
            teas.map(({ name }) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
        <TextField
          required
          margin="dense"
          id="phLowOp"
          label={TANK.PH_LOW}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="phHighOp"
          label={TANK.PH_HIGH}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="tempLowOp"
          label={TANK.TEMP_LOW}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="tempHighOp"
          label={TANK.TEMP_HIGH}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="doLowOp"
          label={TANK.DO_LOW}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="doHighOp"
          label={TANK.DO_HIGH}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="brixLowOp"
          label={TANK.BRIX_LOW}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="brixHighOp"
          label={TANK.BRIX_HIGH}
          type="number"
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          저장
        </Button>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
