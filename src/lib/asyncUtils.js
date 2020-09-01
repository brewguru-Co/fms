import { call, put } from "redux-saga/effects";

export const createPromiseSaga = (type, promiseFn) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      const payload = yield call(promiseFn, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (error) {
      yield put({ type: ERROR, payload: error, error: true });
    }
  };
};

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  error: (payload) => ({
    loading: false,
    data: null,
    error: payload,
  }),
};

export const handleAsyncAction = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
