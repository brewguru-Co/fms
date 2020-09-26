import { combineReducers } from "redux";
import teas, { teasSaga } from "./teas";
import tanks, { tanksSaga } from "./tanks";
import products, { productsSaga } from "./products";
import notifications, { notificationsSaga } from "./notifications";
import tankDatas, { tankDatasSaga } from "./tankDatas";
import notificationRecords, {
  notificationRecordsSaga,
} from "./notificationRecords";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  teas,
  tanks,
  notifications,
  notificationRecords,
  tankDatas,
  products,
});
export function* rootSaga() {
  yield all([
    teasSaga(),
    tanksSaga(),
    notificationsSaga(),
    notificationRecordsSaga(),
    tankDatasSaga(),
    productsSaga(),
  ]);
}

export default rootReducer;
