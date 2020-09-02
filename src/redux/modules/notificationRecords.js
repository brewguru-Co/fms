import * as api from "../../api/notificationRecords";
import { call, put, takeEvery } from "redux-saga/effects";

const GET_NOTIFICATION_RECORDS = "GET_NOTIFICATION_RECORDS";
const GET_NOTIFICATION_RECORDS_SUCCESS = "GET_NOTIFICATION_RECORDS_SUCCESS";
const GET_NOTIFICATION_RECORDS_ERROR = "GET_NOTIFICATION_RECORDS_ERROR";

export const getNotificationRecords = () => ({
  type: GET_NOTIFICATION_RECORDS,
});

function* getNotificationRecordsSaga() {
  try {
    const notificationRecords = yield call(api.getNotificationRecords);
    yield put({
      type: GET_NOTIFICATION_RECORDS_SUCCESS,
      notificationRecords,
    });
  } catch (error) {
    yield put({
      type: GET_NOTIFICATION_RECORDS_ERROR,
      error,
    });
  }
}

export function* notificationRecordsSaga() {
  yield takeEvery(GET_NOTIFICATION_RECORDS, getNotificationRecordsSaga);
}

const initialState = {
  loading: false,
  notificationRecords: null,
  error: null,
};

export default function notificationRecords(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_RECORDS:
      return {
        loading: true,
        notificationRecords: null,
        error: null,
      };
    case GET_NOTIFICATION_RECORDS_SUCCESS:
      return {
        loading: false,
        notificationRecords: action.notificationRecords,
        error: null,
      };
    case GET_NOTIFICATION_RECORDS_ERROR:
      return {
        loading: false,
        notificationRecords: state.notificationRecords,
        error: action.error,
      };
    default:
      return state;
  }
}
