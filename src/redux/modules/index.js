import { combineReducers } from "redux";
import teas, { teasSaga } from "./teas";
import notifications, { notificationsSaga } from "./notifications";
import tankDatas, { tankDatasSaga } from "./tankDatas";
import notificationRecords, {
  notificationRecordsSaga,
} from "./notificationRecords";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  teas,
  notifications,
  notificationRecords,
  tankDatas,
});
export function* rootSaga() {
  yield all([
    teasSaga(),
    notificationsSaga(),
    notificationRecordsSaga(),
    tankDatasSaga(),
  ]);
}

export default rootReducer;
