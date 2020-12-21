import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import storage from '../lib/storage';
import Login from '../components/Login';
import { login } from '../redux/modules/auth';

function LoginContainer({ history }) {
  const auth = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (auth) => dispatch(login(auth));

  useEffect(() => {
    if (auth.id || storage.get('id')) {
      storage.set('id', auth.id);
      window.location.href = '/';
    }
  }, [auth.id]);

  useEffect(() => {
    if (auth.error) {
      setError('잘못된 아이디 또는 패스워드입니다.');
    }
  }, [auth.error, setError]);

  return <Login handleLogin={handleLogin} error={error} />;
}

export default LoginContainer;
