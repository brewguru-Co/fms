import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

const NOTIFICATION = locale.NOTIFICATION;

export default function NotificationDialog(props) {
  const classes = useStyles();
  const { open, handleClose, onCreate } = props;
  const [notification, setNotification] = useState({
    on: true,
  });

  const onChange = (e) => {
    const { id, type, value, checked } = e.target;
    console.log(id, type, value, checked);
    if (type === "checkbox") {
      return setNotification({
        ...notification,
        [id]: checked,
      });
    }
    return setNotification({
      ...notification,
      [id]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSave = () => {
    onCreate(notification);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle id="form-dialog-title">알림 추가</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label={NOTIFICATION.NAME}
          type="text"
          onChange={onChange}
        />
        <TextField
          margin="dense"
          id="email"
          label={NOTIFICATION.EMAIL}
          type="email"
          onChange={onChange}
        />
        <TextField
          margin="dense"
          id="phone"
          label={NOTIFICATION.PHONE}
          type="tel"
          onChange={onChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              required
              checked={notification.on}
              id="on"
              type="checkbox"
              onChange={onChange}
            />
          }
          label="알림"
          labelPlacement="top"
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
