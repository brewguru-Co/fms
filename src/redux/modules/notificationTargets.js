import * as notificationTargetsAPI from "../../api/notificationTargets";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_NOTIFICATION_TARGETS = "GET_NOTIFICATION_TARGETS";
const GET_NOTIFICATION_TARGETS_SUCCESS = "GET_NOTIFICATION_TARGETS_SUCCESS";
const GET_NOTIFICATION_TARGETS_ERROR = "GET_NOTIFICATION_TARGETS_ERROR";

const REMOVE_NOTIFICATION_TARGET = "REMOVE_NOTIFICATION_TARGET";
const REMOVE_NOTIFICATION_TARGET_SUCCESS = "REMOVE_NOTIFICATION_TARGET_SUCCESS";
const REMOVE_NOTIFICATION_TARGET_ERROR = "REMOVE_NOTIFICATION_TARGET_ERROR";

const UPDATE_NOTIFICATION_TARGET = "UPDATE_NOTIFICATION_TARGET";
const UPDATE_NOTIFICATION_TARGET_SUCCESS = "UPDATE_NOTIFICATION_TARGET_SUCCESS";
const UPDATE_NOTIFICATION_TARGET_ERROR = "UPDATE_NOTIFICATION_TARGET_ERROR";

const CREATE_NOTIFICATION_TARGET = "CREATE_NOTIFICATION_TARGET";
const CREATE_NOTIFICATION_TARGET_SUCCESS = "CREATE_NOTIFICATION_TARGET_SUCCESS";
const CREATE_NOTIFICATION_TARGET_ERROR = "CREATE_NOTIFICATION_TARGET_ERROR";

export const getNotificationTargets = () => ({
  type: GET_NOTIFICATION_TARGETS,
});
export const removeNotificationTarget = (id) => ({
  type: REMOVE_NOTIFICATION_TARGET,
  id,
});
export const updateNotificationTarget = (notificationTarget) => ({
  type: UPDATE_NOTIFICATION_TARGET,
  notificationTarget,
});
export const createNotificationTarget = (notificationTarget) => ({
  type: CREATE_NOTIFICATION_TARGET,
  notificationTarget,
});

function* getNotificationTargetsSaga() {
  try {
    const notificationTargets = yield call(
      notificationTargetsAPI.getNotificationTargets
    );
    yield put({
      type: GET_NOTIFICATION_TARGETS_SUCCESS,
      notificationTargets,
    });
  } catch (error) {
    yield put({
      type: GET_NOTIFICATION_TARGETS_ERROR,
      error,
    });
  }
}

function* removeNotificationTargetSaga(action) {
  const id = action.id;
  try {
    const removedNotificationTargetId = yield call(
      notificationTargetsAPI.deleteNotificationTarget,
      id
    );
    yield put({
      type: REMOVE_NOTIFICATION_TARGET_SUCCESS,
      id: removedNotificationTargetId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_NOTIFICATION_TARGET_ERROR,
      error,
    });
  }
}

function* updateNotificationTargetSaga(action) {
  const notificationTarget = action.notificationTarget;
  try {
    const updatedNotificationTarget = yield call(
      notificationTargetsAPI.patchNotificationTarget,
      notificationTarget
    );
    yield put({
      type: UPDATE_NOTIFICATION_TARGET_SUCCESS,
      notificationTarget: updatedNotificationTarget,
    });
  } catch (error) {
    yield put({
      type: UPDATE_NOTIFICATION_TARGET_ERROR,
      error,
    });
  }
}

function* createNotificationTargetSaga(action) {
  const notificationTarget = action.notificationTarget;
  try {
    const id = yield call(
      notificationTargetsAPI.postNotificationTarget,
      notificationTarget
    );
    yield put({
      type: CREATE_NOTIFICATION_TARGET_SUCCESS,
      notificationTarget: {
        ...notificationTarget,
        id,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_NOTIFICATION_TARGET_ERROR,
      error,
    });
  }
}

export function* notificationTargetsSaga() {
  yield takeEvery(GET_NOTIFICATION_TARGETS, getNotificationTargetsSaga);
  yield takeLatest(REMOVE_NOTIFICATION_TARGET, removeNotificationTargetSaga);
  yield takeLatest(UPDATE_NOTIFICATION_TARGET, updateNotificationTargetSaga);
  yield takeLatest(CREATE_NOTIFICATION_TARGET, createNotificationTargetSaga);
}

const initialState = {
  loading: false,
  notificationTargets: null,
  error: null,
};

export default function notificationTargets(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_TARGETS:
      return {
        loading: true,
        notificationTargets: null,
        error: null,
      };
    case GET_NOTIFICATION_TARGETS_SUCCESS:
      return {
        loading: false,
        notificationTargets: action.notificationTargets,
        error: null,
      };
    case REMOVE_NOTIFICATION_TARGET:
      return {
        loading: true,
        notificationTargets: state.notificationTargets,
        error: null,
      };
    case REMOVE_NOTIFICATION_TARGET_SUCCESS:
      return {
        loading: false,
        notificationTargets: state.notificationTargets.filter(
          (notificationTarget) => notificationTarget.id !== action.id
        ),
        error: null,
      };
    case UPDATE_NOTIFICATION_TARGET:
      return {
        loading: true,
        notificationTargets: state.notificationTargets,
        error: null,
      };
    case UPDATE_NOTIFICATION_TARGET_SUCCESS:
      return {
        loading: false,
        notificationTargets: state.notificationTargets.map(
          (notificationTarget) =>
            notificationTarget.id !== action.notificationTarget.id
              ? notificationTarget
              : { ...action.notificationTarget }
        ),
        error: null,
      };
    case CREATE_NOTIFICATION_TARGET:
      return {
        loading: true,
        notificationTargets: state.notificationTargets,
        error: null,
      };
    case CREATE_NOTIFICATION_TARGET_SUCCESS:
      return {
        loading: false,
        notificationTargets: state.notificationTargets.concat(
          action.notificationTarget
        ),
        error: null,
      };
    case GET_NOTIFICATION_TARGETS_ERROR:
    case REMOVE_NOTIFICATION_TARGET_ERROR:
    case UPDATE_NOTIFICATION_TARGET_ERROR:
    case CREATE_NOTIFICATION_TARGET_ERROR:
      return {
        loading: false,
        notificationTargets: state.notificationTargets,
        error: action.error,
      };
    default:
      return state;
  }
}
