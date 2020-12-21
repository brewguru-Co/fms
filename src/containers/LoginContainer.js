import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import storage from '../lib/storage';
import Login from '../components/Login';

function LoginContainer({ history, location }) {
  return <Login />;
}

export default LoginContainer;
