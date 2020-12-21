import React from 'react';
import { Route } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer';

function LoginPage() {
  return (
    <>
      <Route path='/auth/login' component={LoginContainer} />
    </>
  );
}

export default LoginPage;
