import { combineReducers } from "redux";
import teas, { teasSaga } from "./teas";
import notifications, { notificationsSaga } from "./notifications";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  teas,
  notifications,
});
export function* rootSaga() {
  yield all([teasSaga(), notificationsSaga()]);
}

export default rootReducer;
