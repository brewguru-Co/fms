import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CIndicator from "../components/CIndicator";
import EditableTable from "../components/EditableTable";
import {
  getTanks,
  removeTank,
  updateTank,
  createTank,
} from "../redux/modules/tanks";
import { tankValidator } from "../lib/formSchema";
import locale from "../locale/ko_KR.json";

const TANK = locale.TANK;
const columns = [
  { id: "name", type: "text", disablePadding: true, label: TANK.NAME },
  { id: "teaName", type: "text", disablePadding: true, label: TANK.TEA_NAME },
  {
    id: "phLow",
    type: "number",
    disablePadding: true,
    label: TANK.PH_LOW,
  },
  {
    id: "phHigh",
    type: "number",
    disablePadding: true,
    label: TANK.PH_HIGH,
  },
  {
    id: "tempLow",
    type: "number",
    disablePadding: true,
    label: TANK.TEMP_LOW,
  },
  {
    id: "tempHigh",
    type: "number",
    disablePadding: true,
    label: TANK.TEMP_HIGH,
  },
  {
    id: "doLow",
    type: "number",
    disablePadding: true,
    label: TANK.DO_LOW,
  },
  {
    id: "doHigh",
    type: "number",
    disablePadding: true,
    label: TANK.DO_HIGH,
  },
  {
    id: "brixLow",
    type: "number",
    disablePadding: true,
    label: TANK.BRIX_LOW,
  },
  {
    id: "brixHigh",
    type: "number",
    disablePadding: true,
    label: TANK.BRIX_HIGH,
  },
];

function TankManagementContainer() {
  const { loading, error, tanks: data } = useSelector((state) => state.tanks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTanks());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeTank(id));
  const onUpdate = (tank) => dispatch(updateTank(tank));
  const onCreate = (tank) => dispatch(createTank(tank));

  if (error) return <div>Aysnc Error 발생</div>;
  return (
    <>
      {loading && <CIndicator />}
      {data && (
        <>
          <EditableTable
            columns={columns}
            rows={data}
            title="탱크 설정"
            subTitle="탱크 별 최적 범위 설정. 최적 범위를 벗어나지 않도록 자동 제어 및 알림"
            onRemove={onRemove}
            onUpdate={onUpdate}
            onCreate={onCreate}
            dialog="tank"
            validator={tankValidator}
            color="orange"
          />
        </>
      )}
    </>
  );
}

export default TankManagementContainer;
