import { combineReducers } from "redux";
import teas, { teasSaga } from "./teas";
import tanks, { tanksSaga } from "./tanks";
import batchs, { batchsSaga } from "./batchs";
import notificationTargets, {
  notificationTargetsSaga,
} from "./notificationTargets";
import tankDatas, { tankDatasSaga } from "./tankDatas";
import notifications, { notificationsSaga } from "./notifications";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  teas,
  tanks,
  notifications,
  notificationTargets,
  tankDatas,
  batchs,
});
export function* rootSaga() {
  yield all([
    teasSaga(),
    tanksSaga(),
    notificationsSaga(),
    notificationTargetsSaga(),
    tankDatasSaga(),
    batchsSaga(),
  ]);
}

export default rootReducer;
