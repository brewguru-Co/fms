import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

const TEA = locale.TEA;

export default function TeaDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;
  const [tea, setTea] = useState({});

  const onChange = (e) => {
    const { id, type, value } = e.target;
    setTea({
      ...tea,
      [id]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSave = () => {
    onCreate(tea);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">관리 품목 추가</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label={TEA.NAME}
          type="text"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="phLowOp"
          label={TEA.PH_LOW_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="phHighOp"
          label={TEA.PH_HIGH_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="tempLowOp"
          label={TEA.TEMP_LOW_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="tempHighOp"
          label={TEA.TEMP_HIGH_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="doLowOp"
          label={TEA.DO_LOW_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="doHighOp"
          label={TEA.DO_HIGH_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="brixLowOp"
          label={TEA.BRIX_LOW_OP}
          type="number"
          onChange={onChange}
        />
        <TextField
          required
          margin="dense"
          id="brixHighOp"
          label={TEA.BRIX_HIGH_OP}
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
