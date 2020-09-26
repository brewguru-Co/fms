import { call, put, takeLatest } from "redux-saga/effects";
import * as productsApi from "../../api/products";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";

const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";

const CREATE_PRODUCT = "CREATE_PRODUCT";
const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";

export const getProducts = () => ({ type: GET_PRODUCTS });
export const updateProduct = (products) => ({ type: UPDATE_PRODUCT, products });
export const createProduct = (products) => ({ type: CREATE_PRODUCT, products });

function* getProductsSaga() {
  try {
    const products = yield call(productsApi.getProducts);
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      products,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_ERROR,
      error,
    });
  }
}
function* updateProductSaga(action) {
  const { products } = action;
  try {
    yield call(productsApi.patchProduct, products);
    yield put({
      type: UPDATE_PRODUCT_SUCCESS,
      products,
    });
  } catch (error) {
    yield put({
      type: UPDATE_PRODUCT_ERROR,
      error,
    });
  }
}

function* createProductSaga(action) {
  const { products } = action;
  try {
    yield call(productsApi.postProduct, products);
    yield put({
      type: CREATE_PRODUCT_SUCCESS,
      products,
    });
  } catch (error) {
    yield put({
      type: CREATE_PRODUCT_ERROR,
      error,
    });
  }
}

export function* productsSaga() {
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
  yield takeLatest(CREATE_PRODUCT, createProductSaga);
}

const initialState = {
  loading: false,
  error: null,
  products: null,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        loading: true,
        error: null,
        products: null,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        error: null,
        products: action.products,
      };
    case GET_PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.error,
        products: null,
      };
    case UPDATE_PRODUCT:
      return {
        loading: true,
        error: null,
        products: state.products,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        products: state.products.map((product) =>
          product.id === action.products.id ? { ...action.products } : product
        ),
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        loading: false,
        error: action.error,
        products: state.products,
      };
    case CREATE_PRODUCT:
      return {
        loading: true,
        error: null,
        products: state.products,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        products: state.products.concat(action.products),
      };
    case CREATE_PRODUCT_ERROR:
      return {
        loading: false,
        error: action.error,
        products: state.products,
      };
    default:
      return state;
  }
}
