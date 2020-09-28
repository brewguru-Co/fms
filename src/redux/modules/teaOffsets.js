import * as teaOffsetsAPI from "../../api/teaOffsets";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_TEA_OFFSETS = "GET_TEA_OFFSETS";
const GET_TEA_OFFSETS_SUCCESS = "GET_TEA_OFFSETS_SUCCESS";
const GET_TEA_OFFSETS_ERROR = "GET_TEA_OFFSETS_ERROR";

const REMOVE_TEA_OFFSET = "REMOVE_TEA_OFFSET";
const REMOVE_TEA_OFFSET_SUCCESS = "REMOVE_TEA_OFFSET_SUCCESS";
const REMOVE_TEA_OFFSET_ERROR = "REMOVE_TEA_OFFSET_ERROR";

const UPDATE_TEA_OFFSET = "UPDATE_TEA_OFFSET";
const UPDATE_TEA_OFFSET_SUCCESS = "UPDATE_TEA_OFFSET_SUCCESS";
const UPDATE_TEA_OFFSET_ERROR = "UPDATE_TEA_OFFSET_ERROR";

const CREATE_TEA_OFFSET = "CREATE_TEA_OFFSET";
const CREATE_TEA_OFFSET_SUCCESS = "CREATE_TEA_OFFSET_SUCCESS";
const CREATE_TEA_OFFSET_ERROR = "CREATE_TEA_OFFSET_ERROR";

export const getTeaOffsets = () => ({ type: GET_TEA_OFFSETS });
export const removeTeaOffset = (id) => ({ type: REMOVE_TEA_OFFSET, id });
export const updateTeaOffset = (teaOffset) => ({
  type: UPDATE_TEA_OFFSET,
  teaOffset,
});
export const createTeaOffset = (teaOffset) => ({
  type: CREATE_TEA_OFFSET,
  teaOffset,
});

function* getTeaOffsetsSaga() {
  try {
    const teaOffsets = yield call(teaOffsetsAPI.getTeaOffsets);
    yield put({
      type: GET_TEA_OFFSETS_SUCCESS,
      teaOffsets,
    });
  } catch (error) {
    yield put({
      type: GET_TEA_OFFSETS_ERROR,
      error,
    });
  }
}

function* removeTeaOffsetSaga(action) {
  const id = action.id;
  try {
    const removedTeaOffsetId = yield call(teaOffsetsAPI.deleteTeaOffset, id);
    yield put({
      type: REMOVE_TEA_OFFSET_SUCCESS,
      id: removedTeaOffsetId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_TEA_OFFSET_ERROR,
      error,
    });
  }
}

function* updateTeaOffsetSaga(action) {
  const teaOffset = action.teaOffset;
  try {
    const updatedTeaOffset = yield call(
      teaOffsetsAPI.patchTeaOffset,
      teaOffset
    );
    yield put({
      type: UPDATE_TEA_OFFSET_SUCCESS,
      teaOffset: updatedTeaOffset,
    });
  } catch (error) {
    yield put({
      type: UPDATE_TEA_OFFSET_ERROR,
      error,
    });
  }
}

function* createTeaOffsetSaga(action) {
  const teaOffset = action.teaOffset;
  try {
    const id = yield call(teaOffsetsAPI.postTeaOffset, teaOffset);
    yield put({
      type: CREATE_TEA_OFFSET_SUCCESS,
      teaOffset: {
        ...teaOffset,
        id,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_TEA_OFFSET_ERROR,
      error,
    });
  }
}

export function* teaOffsetsSaga() {
  yield takeEvery(GET_TEA_OFFSETS, getTeaOffsetsSaga);
  yield takeLatest(REMOVE_TEA_OFFSET, removeTeaOffsetSaga);
  yield takeLatest(UPDATE_TEA_OFFSET, updateTeaOffsetSaga);
  yield takeLatest(CREATE_TEA_OFFSET, createTeaOffsetSaga);
}

const initialState = {
  loading: false,
  teaOffsets: null,
  error: null,
};

export default function teaOffsets(state = initialState, action) {
  switch (action.type) {
    case GET_TEA_OFFSETS:
      return {
        loading: true,
        teaOffsets: null,
        error: null,
      };
    case GET_TEA_OFFSETS_SUCCESS:
      return {
        loading: false,
        teaOffsets: action.teaOffsets,
        error: null,
      };
    case REMOVE_TEA_OFFSET:
      return {
        loading: true,
        teaOffsets: state.teaOffsets,
        error: null,
      };
    case REMOVE_TEA_OFFSET_SUCCESS:
      return {
        loading: false,
        teaOffsets: state.teaOffsets.filter(
          (teaOffset) => teaOffset.id !== action.id
        ),
        error: null,
      };
    case UPDATE_TEA_OFFSET:
      return {
        loading: true,
        teaOffsets: state.teaOffsets,
        error: null,
      };
    case UPDATE_TEA_OFFSET_SUCCESS:
      return {
        loading: false,
        teaOffsets: state.teaOffsets.map((teaOffset) =>
          teaOffset.id !== action.teaOffset.id
            ? teaOffset
            : { ...action.teaOffset }
        ),
        error: null,
      };
    case CREATE_TEA_OFFSET:
      return {
        loading: true,
        teaOffsets: state.teaOffsets,
        error: null,
      };
    case CREATE_TEA_OFFSET_SUCCESS:
      return {
        loading: false,
        teaOffsets: state.teaOffsets.concat(action.teaOffset),
        error: null,
      };
    case GET_TEA_OFFSETS_ERROR:
    case REMOVE_TEA_OFFSET_ERROR:
    case UPDATE_TEA_OFFSET_ERROR:
    case CREATE_TEA_OFFSET_ERROR:
      return {
        loading: false,
        teaOffsets: state.teaOffsets,
        error: action.error,
      };
    default:
      return state;
  }
}
