import * as notificationsAPI from "../../api/notifications";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
const GET_NOTIFICATIONS_ERROR = "GET_NOTIFICATIONS_ERROR";

const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
const REMOVE_NOTIFICATION_SUCCESS = "REMOVE_NOTIFICATION_SUCCESS";
const REMOVE_NOTIFICATION_ERROR = "REMOVE_NOTIFICATION_ERROR";

const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
const UPDATE_NOTIFICATION_SUCCESS = "UPDATE_NOTIFICATION_SUCCESS";
const UPDATE_NOTIFICATION_ERROR = "UPDATE_NOTIFICATION_ERROR";

const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
const CREATE_NOTIFICATION_SUCCESS = "CREATE_NOTIFICATION_SUCCESS";
const CREATE_NOTIFICATION_ERROR = "CREATE_NOTIFICATION_ERROR";

export const getNotifications = () => ({ type: GET_NOTIFICATIONS });
export const removeNotification = (id) => ({ type: REMOVE_NOTIFICATION, id });
export const updateNotification = (notification) => ({
  type: UPDATE_NOTIFICATION,
  notification,
});
export const createNotification = (notification) => ({
  type: CREATE_NOTIFICATION,
  notification,
});

function* getNotificationsSaga() {
  try {
    const notifications = yield call(notificationsAPI.getNotifications);
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

function* removeNotificationSaga(action) {
  const id = action.id;
  try {
    const removedNotificationId = yield call(
      notificationsAPI.removeNotification,
      id
    );
    yield put({
      type: REMOVE_NOTIFICATION_SUCCESS,
      id: removedNotificationId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_NOTIFICATION_ERROR,
      error,
    });
  }
}

function* updateNotificationSaga(action) {
  const notification = action.notification;
  try {
    const updatedNotification = yield call(
      notificationsAPI.updateNotification,
      notification
    );
    yield put({
      type: UPDATE_NOTIFICATION_SUCCESS,
      notification: updatedNotification,
    });
  } catch (error) {
    yield put({
      type: UPDATE_NOTIFICATION_ERROR,
      error,
    });
  }
}

function* createNotificationSaga(action) {
  const notification = action.notification;
  try {
    const id = yield call(notificationsAPI.createNotification, notification);
    yield put({
      type: CREATE_NOTIFICATION_SUCCESS,
      notification: {
        ...notification,
        id,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_NOTIFICATION_ERROR,
      error,
    });
  }
}

export function* notificationsSaga() {
  yield takeEvery(GET_NOTIFICATIONS, getNotificationsSaga);
  yield takeLatest(REMOVE_NOTIFICATION, removeNotificationSaga);
  yield takeLatest(UPDATE_NOTIFICATION, updateNotificationSaga);
  yield takeLatest(CREATE_NOTIFICATION, createNotificationSaga);
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
    case REMOVE_NOTIFICATION:
      return {
        loading: true,
        notifications: state.notifications,
        error: null,
      };
    case REMOVE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.id
        ),
        error: null,
      };
    case UPDATE_NOTIFICATION:
      return {
        loading: true,
        notifications: state.notifications,
        error: null,
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        notifications: state.notifications.map((notification) =>
          notification.id !== action.notification.id
            ? notification
            : { ...action.notification }
        ),
        error: null,
      };
    case CREATE_NOTIFICATION:
      return {
        loading: true,
        notifications: state.notifications,
        error: null,
      };
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        notifications: state.notifications.concat(action.notification),
        error: null,
      };
    case GET_NOTIFICATIONS_ERROR:
    case REMOVE_NOTIFICATION_ERROR:
    case UPDATE_NOTIFICATION_ERROR:
    case CREATE_NOTIFICATION_ERROR:
      return {
        loading: false,
        notifications: state.notifications,
        error: action.error,
      };
    default:
      return state;
  }
}
