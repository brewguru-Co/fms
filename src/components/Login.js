import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from '../assets/jss/components/loginStyle';

const useStyles = makeStyles(styles);

function Login(props) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const handleId = (e) => setId(e.target.value);
  const handlePwd = (e) => setPwd(e.target.value);
  const handleLogin = () => props.handleLogin({ id, password: pwd });

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.logoWrapper}>
        <Typography className={classes.logo}>BREWGURU</Typography>
      </div>
      <div className={classes.content}>
        <Typography className={classes.label}>아이디</Typography>
        <TextField className={classes.input} onChange={handleId} value={id} fullWidth />
        <Typography className={classes.label}>비밀번호</Typography>
        <TextField className={classes.input} onChange={handlePwd} value={pwd} fullWidth />
        {props.error && <Typography className={classes.error}>{props.error}</Typography>}
        <Button className={classes.button} onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </Paper>
  );
}

export default Login;
