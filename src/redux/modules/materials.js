import * as materialsAPI from "../../api/materials";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const GET_MATERIALS = "GET_MATERIALS";
const GET_MATERIALS_SUCCESS = "GET_MATERIALS_SUCCESS";
const GET_MATERIALS_ERROR = "GET_MATERIALS_ERROR";

const REMOVE_MATERIAL = "REMOVE_MATERIAL";
const REMOVE_MATERIAL_SUCCESS = "REMOVE_MATERIAL_SUCCESS";
const REMOVE_MATERIAL_ERROR = "REMOVE_MATERIAL_ERROR";

const UPDATE_MATERIAL = "UPDATE_MATERIAL";
const UPDATE_MATERIAL_SUCCESS = "UPDATE_MATERIAL_SUCCESS";
const UPDATE_MATERIAL_ERROR = "UPDATE_MATERIAL_ERROR";

const CREATE_MATERIAL = "CREATE_MATERIAL";
const CREATE_MATERIAL_SUCCESS = "CREATE_MATERIAL_SUCCESS";
const CREATE_MATERIAL_ERROR = "CREATE_MATERIAL_ERROR";

export const getMaterials = () => ({ type: GET_MATERIALS });
export const removeMaterial = (id) => ({ type: REMOVE_MATERIAL, id });
export const updateMaterial = (material) => ({
  type: UPDATE_MATERIAL,
  material,
});
export const createMaterial = (material) => ({
  type: CREATE_MATERIAL,
  material,
});

function* getMaterialsSaga() {
  try {
    const materials = yield call(materialsAPI.getMaterials);
    yield put({
      type: GET_MATERIALS_SUCCESS,
      materials,
    });
  } catch (error) {
    yield put({
      type: GET_MATERIALS_ERROR,
      error,
    });
  }
}

function* removeMaterialSaga(action) {
  const id = action.id;
  try {
    const removedMaterialId = yield call(materialsAPI.deleteMaterial, id);
    yield put({
      type: REMOVE_MATERIAL_SUCCESS,
      id: removedMaterialId,
    });
  } catch (error) {
    yield put({
      type: REMOVE_MATERIAL_ERROR,
      error,
    });
  }
}

function* updateMaterialSaga(action) {
  const material = action.material;
  try {
    const updatedMaterial = yield call(
      materialsAPI.patchMaterial,
      material
    );
    yield put({
      type: UPDATE_MATERIAL_SUCCESS,
      material: updatedMaterial,
    });
  } catch (error) {
    yield put({
      type: UPDATE_MATERIAL_ERROR,
      error,
    });
  }
}

function* createMaterialSaga(action) {
  const material = action.material;
  try {
    const id = yield call(materialsAPI.postMaterial, material);
    yield put({
      type: CREATE_MATERIAL_SUCCESS,
      material: {
        ...material,
        id,
      },
    });
  } catch (error) {
    yield put({
      type: CREATE_MATERIAL_ERROR,
      error,
    });
  }
}

export function* materialsSaga() {
  yield takeEvery(GET_MATERIALS, getMaterialsSaga);
  yield takeLatest(REMOVE_MATERIAL, removeMaterialSaga);
  yield takeLatest(UPDATE_MATERIAL, updateMaterialSaga);
  yield takeLatest(CREATE_MATERIAL, createMaterialSaga);
}

const initialState = {
  loading: false,
  materials: null,
  error: null,
};

export default function materials(state = initialState, action) {
  switch (action.type) {
    case GET_MATERIALS:
      return {
        loading: true,
        materials: null,
        error: null,
      };
    case GET_MATERIALS_SUCCESS:
      return {
        loading: false,
        materials: action.materials,
        error: null,
      };
    case REMOVE_MATERIAL:
      return {
        loading: true,
        materials: state.materials,
        error: null,
      };
    case REMOVE_MATERIAL_SUCCESS:
      return {
        loading: false,
        materials: state.materials.filter(
          (material) => material.id !== action.id
        ),
        error: null,
      };
    case UPDATE_MATERIAL:
      return {
        loading: true,
        materials: state.materials,
        error: null,
      };
    case UPDATE_MATERIAL_SUCCESS:
      return {
        loading: false,
        materials: state.materials.map((material) =>
          material.id !== action.material.id
            ? material
            : { ...action.material }
        ),
        error: null,
      };
    case CREATE_MATERIAL:
      return {
        loading: true,
        materials: state.materials,
        error: null,
      };
    case CREATE_MATERIAL_SUCCESS:
      return {
        loading: false,
        materials: state.materials.concat(action.material),
        error: null,
      };
    case GET_MATERIALS_ERROR:
    case REMOVE_MATERIAL_ERROR:
    case UPDATE_MATERIAL_ERROR:
    case CREATE_MATERIAL_ERROR:
      return {
        loading: false,
        materials: state.materials,
        error: action.error,
      };
    default:
      return state;
  }
}
