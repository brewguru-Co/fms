import { combineReducers } from 'redux';
import teas, { teasSaga } from './teas';
import tanks, { tanksSaga } from './tanks';
import batchs, { batchsSaga } from './batchs';
import batchDatas, { batchDatasSaga } from './batchDatas';
import notificationTargets, {
  notificationTargetsSaga,
} from './notificationTargets';
import tankDatas, { tankDatasSaga } from './tankDatas';
import notifications, { notificationsSaga } from './notifications';
import teaOffsets, { teaOffsetsSaga } from './teaOffsets';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  teas,
  tanks,
  notifications,
  notificationTargets,
  tankDatas,
  batchs,
  batchDatas,
  teaOffsets,
});
export function* rootSaga() {
  yield all([
    teasSaga(),
    tanksSaga(),
    notificationsSaga(),
    notificationTargetsSaga(),
    tankDatasSaga(),
    batchsSaga(),
    batchDatasSaga(),
    teaOffsetsSaga(),
  ]);
}

export default rootReducer;
