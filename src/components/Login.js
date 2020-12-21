import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from '../assets/jss/components/loginStyle';

const useStyles = makeStyles(styles);

function Login(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.logoWrapper}>
        <Typography className={classes.logo}>BREWGURU</Typography>
      </div>
      <div className={classes.content}>
        <Typography className={classes.label}>아이디</Typography>
        <TextField className={classes.input} fullWidth />
        <Typography className={classes.label}>비밀번호</Typography>
        <TextField className={classes.input} fullWidth />
        <Button className={classes.button}>로그인</Button>
      </div>
    </Paper>
  );
}

export default Login;
