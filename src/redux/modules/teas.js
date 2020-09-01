import * as teasAPI from "../../api/teas";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_TEAS = "GET_TEAS";
const GET_TEAS_SUCCESS = "GET_TEAS_SUCCESS";
const GET_TEAS_ERROR = "GET_TEAS_ERROR";

const REMOVE_TEA = "REMOVE_TEA";
const REMOVE_TEA_SUCCESS = "REMOVE_TEA_SUCCESS";
const REMOVE_TEA_ERROR = "REMOVE_TEA_ERROR";

const UPDATE_TEA = "UPDATE_TEA";
const UPDATE_TEA_SUCCESS = "UPDATE_TEA_SUCCESS";
const UPDATE_TEA_ERROR = "UPDATE_TEA_ERROR";

export const getTeas = () => ({ type: GET_TEAS });
export const removeTea = (id) => ({ type: REMOVE_TEA, id });
export const updateTea = (tea) => ({ type: UPDATE_TEA, tea });

function* getTeasSaga() {
  try {
    const teas = yield call(teasAPI.getTeas);
    yield put({
      type: GET_TEAS_SUCCESS,
      teas,
    });
  } catch (error) {
    yield put({
      type: GET_TEAS_ERROR,
      error,
    });
  }
}

function* removeTeaSaga(action) {
  const id = action.id;
  try {
    const removedTeaId = yield call(teasAPI.removeTea, id);
    yield put({
      type: REMOVE_TEA_SUCCESS,
      id: removedTeaId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_TEA_ERROR,
      error,
    });
  }
}

function* updateTeaSaga(action) {
  const tea = action.tea;
  try {
    const updatedTea = yield call(teasAPI.updateTea, tea);
    yield put({
      type: UPDATE_TEA_SUCCESS,
      tea: updatedTea,
    });
  } catch (error) {
    yield put({
      type: UPDATE_TEA_ERROR,
      error,
    });
  }
}

export function* teasSaga() {
  yield takeEvery(GET_TEAS, getTeasSaga);
  yield takeLatest(REMOVE_TEA, removeTeaSaga);
  yield takeLatest(UPDATE_TEA, updateTeaSaga);
}

const initialState = {
  loading: false,
  teas: null,
  error: null,
};

export default function teas(state = initialState, action) {
  switch (action.type) {
    case GET_TEAS:
      return {
        loading: true,
        teas: null,
        error: null,
      };
    case GET_TEAS_SUCCESS:
      return {
        loading: false,
        teas: action.teas,
        error: null,
      };
    case GET_TEAS_ERROR:
      return {
        loading: false,
        teas: state.teas,
        error: action.error,
      };
    case REMOVE_TEA:
      return {
        loading: true,
        teas: state.teas,
        error: null,
      };
    case REMOVE_TEA_SUCCESS:
      return {
        loading: false,
        teas: state.teas.filter((tea) => tea.id !== action.id),
        error: null,
      };
    case REMOVE_TEA_ERROR:
      return {
        loading: false,
        teas: state.teas,
        error: action.error,
      };
    case UPDATE_TEA:
      return {
        loading: true,
        teas: state.teas,
        error: null,
      };
    case UPDATE_TEA_SUCCESS:
      return {
        loading: false,
        teas: state.teas.map((tea) =>
          tea.id !== action.tea.id ? tea : { ...action.tea }
        ),
        error: null,
      };
    case UPDATE_TEA_ERROR:
      return {
        loading: false,
        teas: state.teas,
        error: action.error,
      };
    default:
      return state;
  }
}
