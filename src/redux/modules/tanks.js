import * as tanksAPI from "../../api/tanks";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_TANKS = "GET_TANKS";
const GET_TANKS_SUCCESS = "GET_TANKS_SUCCESS";
const GET_TANKS_ERROR = "GET_TANKS_ERROR";

const REMOVE_TANK = "REMOVE_TANK";
const REMOVE_TANK_SUCCESS = "REMOVE_TANK_SUCCESS";
const REMOVE_TANK_ERROR = "REMOVE_TANK_ERROR";

const UPDATE_TANK = "UPDATE_TANK";
const UPDATE_TANK_SUCCESS = "UPDATE_TANK_SUCCESS";
const UPDATE_TANK_ERROR = "UPDATE_TANK_ERROR";

const CREATE_TANK = "CREATE_TANK";
const CREATE_TANK_SUCCESS = "CREATE_TANK_SUCCESS";
const CREATE_TANK_ERROR = "CREATE_TANK_ERROR";

export const getTanks = () => ({ type: GET_TANKS });
export const removeTank = (id) => ({ type: REMOVE_TANK, id });
export const updateTank = (tank) => ({ type: UPDATE_TANK, tank });
export const createTank = (tank) => ({ type: CREATE_TANK, tank });

function* getTanksSaga() {
  try {
    const tanks = yield call(tanksAPI.getTanks);
    yield put({
      type: GET_TANKS_SUCCESS,
      tanks,
    });
  } catch (error) {
    yield put({
      type: GET_TANKS_ERROR,
      error,
    });
  }
}

function* removeTankSaga(action) {
  const id = action.id;
  try {
    const removedTankId = yield call(tanksAPI.removeTank, id);
    yield put({
      type: REMOVE_TANK_SUCCESS,
      id: removedTankId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_TANK_ERROR,
      error,
    });
  }
}

function* updateTankSaga(action) {
  const tank = action.tank;
  try {
    const updatedTank = yield call(tanksAPI.updateTank, tank);
    yield put({
      type: UPDATE_TANK_SUCCESS,
      tank: updatedTank,
    });
  } catch (error) {
    yield put({
      type: UPDATE_TANK_ERROR,
      error,
    });
  }
}

function* createTankSaga(action) {
  const tank = action.tank;
  try {
    const id = yield call(tanksAPI.createTank, tank);
    yield put({
      type: CREATE_TANK_SUCCESS,
      tank: {
        ...tank,
        id,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_TANK_ERROR,
      error,
    });
  }
}

export function* tanksSaga() {
  yield takeEvery(GET_TANKS, getTanksSaga);
  yield takeLatest(REMOVE_TANK, removeTankSaga);
  yield takeLatest(UPDATE_TANK, updateTankSaga);
  yield takeLatest(CREATE_TANK, createTankSaga);
}

const initialState = {
  loading: false,
  tanks: null,
  error: null,
};

export default function tanks(state = initialState, action) {
  switch (action.type) {
    case GET_TANKS:
      return {
        loading: true,
        tanks: null,
        error: null,
      };
    case GET_TANKS_SUCCESS:
      return {
        loading: false,
        tanks: action.tanks,
        error: null,
      };
    case REMOVE_TANK:
      return {
        loading: true,
        tanks: state.tanks,
        error: null,
      };
    case REMOVE_TANK_SUCCESS:
      return {
        loading: false,
        tanks: state.tanks.filter((tank) => tank.id !== action.id),
        error: null,
      };
    case UPDATE_TANK:
      return {
        loading: true,
        tanks: state.tanks,
        error: null,
      };
    case UPDATE_TANK_SUCCESS:
      return {
        loading: false,
        tanks: state.tanks.map((tank) =>
          tank.id !== action.tank.id ? tank : { ...action.tank }
        ),
        error: null,
      };
    case CREATE_TANK:
      return {
        loading: true,
        tanks: state.tanks,
        error: null,
      };
    case CREATE_TANK_SUCCESS:
      return {
        loading: false,
        tanks: state.tanks.concat(action.tank),
        error: null,
      };
    case GET_TANKS_ERROR:
    case REMOVE_TANK_ERROR:
    case UPDATE_TANK_ERROR:
    case CREATE_TANK_ERROR:
      return {
        loading: false,
        tanks: state.tanks,
        error: action.error,
      };
    default:
      return state;
  }
}
