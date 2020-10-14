import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SortTable from "../components/SortTable";
import { getBatchs } from "../redux/modules/batchs";
import { getTimeString } from "../lib/time";

const formatTime = (rows) =>
  rows.map((row) => ({
    ...row,
    startedAt: getTimeString(row.startedAt, "YYYY-MM-DD"),
  }));

const columns = [
  { id: "startedAt", numeric: true, label: "제조일 (년월일)" },
  { id: "teaName", numeric: false, label: "품목명" },
  { id: "ph", numeric: true, label: "PH" },
  { id: "dox", numeric: true, label: "용존산소량" },
  { id: "temp", numeric: true, label: "온도" },
  { id: "brix", numeric: true, label: "당도" },
];

const useStyles = makeStyles({});

function BatchHistoryContainer() {
  const classes = useStyles();
  const { loading, error, batchs: data } = useSelector((state) => state.batchs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBatchs());
  }, [dispatch]);

  return (
    <>
      {data && (
        <SortTable
          rows={formatTime(data)}
          columns={columns}
          title="제품 생산 히스토리"
          color="gray"
        />
      )}
    </>
  );
}

export default BatchHistoryContainer;
