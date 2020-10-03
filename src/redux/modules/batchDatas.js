import * as batchDataApi from '../../api/batchDatas';
import { call, put, takeEvery } from 'redux-saga/effects';

const GET_BATCH_DATAS = 'GET_BATCH_DATAS';
const GET_BATCH_DATAS_SUCCESS = 'GET_BATCH_DATAS_SUCCESS';
const GET_BATCH_DATAS_ERROR = 'GET_BATCH_DATAS_ERROR';

export const getBatchDatas = () => ({
  type: GET_BATCH_DATAS,
});

function* getBatchDatasSaga() {
  try {
    const batchDatas = yield call(batchDataApi.getBatchDatas);
    yield put({
      type: GET_BATCH_DATAS_SUCCESS,
      batchDatas,
    });
  } catch (error) {
    yield put({
      type: GET_BATCH_DATAS_ERROR,
      error,
    });
  }
}

export function* batchDatasSaga() {
  yield takeEvery(GET_BATCH_DATAS, getBatchDatasSaga);
}

const initialState = {
  loading: false,
  batchDatas: null,
  error: null,
};

export default function batchDatas(state = initialState, action) {
  switch (action.type) {
    case GET_BATCH_DATAS:
      return {
        loading: true,
        batchDatas: null,
        error: null,
      };
    case GET_BATCH_DATAS_SUCCESS:
      return {
        loading: false,
        batchDatas: action.batchDatas,
        error: null,
      };
    case GET_BATCH_DATAS_ERROR:
      return {
        loading: false,
        batchDatas: state.batchDatas,
        error: action.error,
      };
    default:
      return state;
  }
}
