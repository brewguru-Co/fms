import { call, put, takeLatest } from "redux-saga/effects";
import * as batchsApi from "../../api/batchs";

const GET_BATCHS = "GET_BATCHS";
const GET_BATCHS_SUCCESS = "GET_BATCHS_SUCCESS";
const GET_BATCHS_ERROR = "GET_BATCHS_ERROR";

const UPDATE_BATCH = "UPDATE_BATCH";
const UPDATE_BATCH_SUCCESS = "UPDATE_BATCH_SUCCESS";
const UPDATE_BATCH_ERROR = "UPDATE_BATCH_ERROR";

const CREATE_BATCH = "CREATE_BATCH";
const CREATE_BATCH_SUCCESS = "CREATE_BATCH_SUCCESS";
const CREATE_BATCH_ERROR = "CREATE_BATCH_ERROR";

export const getBatchs = () => ({ type: GET_BATCHS });
export const updateBatch = (batchs) => ({ type: UPDATE_BATCH, batchs });
export const createBatch = (batchs) => ({ type: CREATE_BATCH, batchs });

function* getBatchsSaga() {
  try {
    const batchs = yield call(batchsApi.getBatchs);
    yield put({
      type: GET_BATCHS_SUCCESS,
      batchs,
    });
  } catch (error) {
    yield put({
      type: GET_BATCHS_ERROR,
      error,
    });
  }
}
function* updateBatchSaga(action) {
  const { batchs } = action;
  try {
    yield call(batchsApi.patchBatch, batchs);
    yield put({
      type: UPDATE_BATCH_SUCCESS,
      batchs,
    });
  } catch (error) {
    yield put({
      type: UPDATE_BATCH_ERROR,
      error,
    });
  }
}

function* createBatchSaga(action) {
  const { batchs } = action;
  try {
    yield call(batchsApi.postBatch, batchs);
    yield put({
      type: CREATE_BATCH_SUCCESS,
      batchs,
    });
  } catch (error) {
    yield put({
      type: CREATE_BATCH_ERROR,
      error,
    });
  }
}

export function* batchsSaga() {
  yield takeLatest(GET_BATCHS, getBatchsSaga);
  yield takeLatest(UPDATE_BATCH, updateBatchSaga);
  yield takeLatest(CREATE_BATCH, createBatchSaga);
}

const initialState = {
  loading: false,
  error: null,
  batchs: null,
};

export default function batchs(state = initialState, action) {
  switch (action.type) {
    case GET_BATCHS:
      return {
        loading: true,
        error: null,
        batchs: null,
      };
    case GET_BATCHS_SUCCESS:
      return {
        loading: false,
        error: null,
        batchs: action.batchs,
      };
    case GET_BATCHS_ERROR:
      return {
        loading: false,
        error: action.error,
        batchs: null,
      };
    case UPDATE_BATCH:
      return {
        loading: true,
        error: null,
        batchs: state.batchs,
      };
    case UPDATE_BATCH_SUCCESS:
      return {
        loading: false,
        error: null,
        batchs: state.batchs.map((batch) =>
          batch.id === action.batchs.id ? { ...action.batchs } : batch
        ),
      };
    case UPDATE_BATCH_ERROR:
      return {
        loading: false,
        error: action.error,
        batchs: state.batchs,
      };
    case CREATE_BATCH:
      return {
        loading: true,
        error: null,
        batchs: state.batchs,
      };
    case CREATE_BATCH_SUCCESS:
      return {
        loading: false,
        error: null,
        batchs: state.batchs.concat(action.batchs),
      };
    case CREATE_BATCH_ERROR:
      return {
        loading: false,
        error: action.error,
        batchs: state.batchs,
      };
    default:
      return state;
  }
}
