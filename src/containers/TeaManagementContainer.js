import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditableTable from "../components/EditableTable";
import { getTeas, removeTea, updateTea } from "../redux/modules/teas";

const useStyles = makeStyles((theme) => ({
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
  },
}));

const columns = [
  { id: "name", numeric: false, disablePadding: false, label: "품목명" },
  { id: "phLowOp", numeric: true, disablePadding: false, label: "최저 PH" },
  { id: "phHighOp", numeric: true, disablePadding: false, label: "최고 PH" },
  { id: "tempLowOp", numeric: true, disablePadding: false, label: "최저 온도" },
  {
    id: "tempHighOp",
    numeric: true,
    disablePadding: false,
    label: "최고 온도",
  },
  { id: "doLowOp", numeric: true, disablePadding: false, label: "최저 DO" },
  { id: "doHighOp", numeric: true, disablePadding: false, label: "최고 DO" },
  { id: "brixLowOp", numeric: true, disablePadding: false, label: "최저 당도" },
  {
    id: "brixHighOp",
    numeric: true,
    disablePadding: false,
    label: "최고 당도",
  },
];

function TeaManagementContainer() {
  const classes = useStyles();
  const { loading, error, teas: data } = useSelector((state) => state.teas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeas());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeTea(id));
  const onUpdate = (tea) => dispatch(updateTea(tea));

  if (error) return <div>Aysnc Error 발생</div>;
  return (
    <>
      {loading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      {data && (
        <EditableTable
          columns={columns}
          rows={data}
          title="최적값 범위 세팅"
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}

export default TeaManagementContainer;
