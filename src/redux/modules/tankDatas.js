import * as tankDataApi from "../../api/tankDatas";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_TANK_DATAS = "GET_TANK_DATAS";
const GET_TANK_DATAS_SUCCESS = "GET_TANK_DATAS_SUCCESS";
const GET_TANK_DATAS_ERROR = "GET_TANK_DATAS_ERROR";

const GET_TANK_REALTIME_DATA = "GET_TANK_REALTIME_DATA";
const GET_TANK_REALTIME_DATA_SUCCESS = "GET_TANK_REALTIME_DATA_SUCCESS";
const GET_TANK_REALTIME_DATA_ERROR = "GET_TANK_REALTIME_DATA_ERROR";

export const getTankDatas = () => ({
  type: GET_TANK_DATAS,
});
export const getTankRealtimeData = () => ({
  type: GET_TANK_REALTIME_DATA,
});

function* getTankDatasSaga() {
  try {
    const tankDatas = yield call(tankDataApi.getTankDatas);
    yield put({
      type: GET_TANK_DATAS_SUCCESS,
      tankDatas,
    });
  } catch (error) {
    yield put({
      type: GET_TANK_DATAS_ERROR,
      error,
    });
  }
}

function* getTankRealtimeDataSaga() {
  try {
    const realtimeTankData = yield call(tankDataApi.getTankRealtimeData);
    yield put({
      type: GET_TANK_REALTIME_DATA_SUCCESS,
      realtimeTankData,
    });
  } catch (error) {
    yield put({
      type: GET_TANK_REALTIME_DATA_ERROR,
      error,
    });
  }
}

export function* tankDatasSaga() {
  yield takeEvery(GET_TANK_DATAS, getTankDatasSaga);
  yield takeLatest(GET_TANK_REALTIME_DATA, getTankRealtimeDataSaga);
}

const initialState = {
  loading: false,
  tankDatas: null,
  realtimeTankData: [],
  error: null,
};

export default function tankDatas(state = initialState, action) {
  switch (action.type) {
    case GET_TANK_DATAS:
      return {
        ...state,
        loading: true,
        tankDatas: null,
        error: null,
      };
    case GET_TANK_DATAS_SUCCESS:
      return {
        ...state,
        loading: false,
        tankDatas: action.tankDatas,
        error: null,
      };
    case GET_TANK_DATAS_ERROR:
      return {
        ...state,
        loading: false,
        tankDatas: state.tankDatas,
        error: action.error,
      };
    case GET_TANK_REALTIME_DATA:
      return {
        ...state,
        loading: true,
        realtimeTankData: state.realtimeTankData,
        error: null,
      };
    case GET_TANK_REALTIME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        realtimeTankData:
          state.realtimeTankData.length < 100
            ? state.realtimeTankData.concat(action.realtimeTankData)
            : state.realtimeTankData
                .slice(
                  state.realtimeTankData.length - 20,
                  state.realtimeTankData.length
                )
                .concat(action.realtimeTankData),
        error: null,
      };
    case GET_TANK_REALTIME_DATA_ERROR:
      return {
        ...state,
        loading: false,
        realtimeTankData: state.realtimeTankData,
        error: action.error,
      };
    default:
      return state;
  }
}
