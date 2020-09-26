import * as api from "../../api/notifications";
import { call, put, takeEvery } from "redux-saga/effects";

const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
const GET_NOTIFICATIONS_ERROR = "GET_NOTIFICATIONS_ERROR";

export const getNotifications = () => ({
  type: GET_NOTIFICATIONS,
});

function* getNotificationsSaga() {
  try {
    const notifications = yield call(api.getNotifications);
    yield put({
      type: GET_NOTIFICATIONS_SUCCESS,
      notifications,
    });
  } catch (error) {
    yield put({
      type: GET_NOTIFICATIONS_ERROR,
      error,
    });
  }
}

export function* notificationsSaga() {
  yield takeEvery(GET_NOTIFICATIONS, getNotificationsSaga);
}

const initialState = {
  loading: false,
  notifications: null,
  error: null,
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        loading: true,
        notifications: null,
        error: null,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        loading: false,
        notifications: action.notifications,
        error: null,
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        loading: false,
        notifications: state.notifications,
        error: action.error,
      };
    default:
      return state;
  }
}
