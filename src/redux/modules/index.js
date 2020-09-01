import { combineReducers } from "redux";
import teas, { teasSaga } from "./teas";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  teas,
});
export function* rootSaga() {
  yield all([teasSaga()]);
}

export default rootReducer;
