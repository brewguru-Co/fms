import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function BatchUsageDialog(props) {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{"알고리즘 데이터로 사용하시겠습니까?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          오류 발생이 있었던 데이터이면 사용하지 않는 것을 추천합니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          사용 안함
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          사용 함
        </Button>
      </DialogActions>
    </Dialog>
  );
}
