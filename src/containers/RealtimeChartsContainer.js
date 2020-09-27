import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTankRealtimeData } from "../redux/modules/tankDatas";
import Grid from "@material-ui/core/Grid";
import RealtimeChart from "../components/Chart/RealtimeChart";
import { realtimeData, realtimeOptions } from "../lib/chart";

function createData(tankDatas, key) {
  const yCount = 10;
  const n = tankDatas.length > yCount ? tankDatas.length - yCount : 0;

  return tankDatas
    .map((tankData) => ({
      x: moment(tankData.createdAt * 1000),
      y: tankData[key],
    }))
    .slice(n, n + yCount);
}

function RealtimeChartsContainer(props) {
  const { loading, error, realtimeTankData: data } = useSelector(
    (state) => state.tankDatas
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getTankRealtimeData());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} xl={3}>
        {data && (
          <RealtimeChart
            color={"green"}
            data={realtimeData(createData(data, "temp"), "white")}
            options={realtimeOptions(24, 32, 2, "white")}
            title={"온도 (Temperature)"}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        {data && (
          <RealtimeChart
            color={"yellow"}
            data={realtimeData(createData(data, "ph"), "white")}
            options={realtimeOptions(2.4, 4.2, 0.3, "white")}
            title={"산도 (PH)"}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        {data && (
          <RealtimeChart
            color={"red"}
            data={realtimeData(createData(data, "brix"), "white")}
            options={realtimeOptions(0, 1, 0.2, "white")}
            title={"당도 (BR)"}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        {data && (
          <RealtimeChart
            color={"gray"}
            data={realtimeData(createData(data, "dox"), "white")}
            options={realtimeOptions(0, 100, 20, "white")}
            title={"용존산소량 (DO)"}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default RealtimeChartsContainer;
