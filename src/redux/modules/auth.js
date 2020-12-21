import { call, put, takeLatest } from 'redux-saga/effects';
import * as authApi from '../../api/auth';

const CHECK_STATUS = 'CHECK_STATUS';
const CHECK_STATUS_SUCCESS = 'CHECK_STATUS_SUCCESS';
const CHECK_STATUS_ERROR = 'CHECK_STATUS_ERROR';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

export const checkStatus = () => ({ type: CHECK_STATUS });
export const signUp = (payload) => ({ type: SIGN_UP, payload });
export const login = (payload) => ({ type: LOGIN, payload });

function* checkStatusSaga() {
  try {
    const payload = yield call(authApi.checkStatus);
    yield put({
      type: CHECK_STATUS_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: CHECK_STATUS_ERROR,
      error,
    });
  }
}
function* signUpSaga(action) {
  const { payload } = action;
  try {
    yield call(authApi.signUp, payload);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error,
    });
  }
}

function* loginSaga(action) {
  const { payload } = action;
  try {
    yield call(authApi.login, payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error,
    });
  }
}

export function* authSaga() {
  yield takeLatest(CHECK_STATUS, checkStatusSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  loading: false,
  error: null,
  status: null,
  id: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CHECK_STATUS:
      return {
        ...state,
        loading: true,
      };
    case CHECK_STATUS_SUCCESS:
      return {
        loading: false,
        error: null,
        status: true,
        id: action.payload.id,
      };
    case CHECK_STATUS_ERROR:
      return {
        loading: false,
        error: action.error,
        status: false,
        id: null,
      };
    case SIGN_UP:
      return {
        ...state,
        loading: true,
        error: null,
        id: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        id: state.payload.id,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        id: null,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
        id: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        id: null,
      };
    default:
      return state;
  }
}
