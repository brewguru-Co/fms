import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTankRealtimeData } from "../redux/modules/tankDatas";
import Grid from "@material-ui/core/Grid";
import { GreasePencil, Thermometer, Water, Gauge } from "mdi-material-ui";
import RealtimeCard from "../components/RealtimeCard";
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
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={3}>
        <RealtimeCard color={"indigo"} title={"온도"} icon={<Thermometer />} />
      </Grid>
      <Grid item xs={3}>
        <RealtimeCard color={"yellow"} title={"PH"} icon={<GreasePencil />} />
      </Grid>
      <Grid item xs={3}>
        <RealtimeCard color={"red"} title={"당도"} icon={<Water />} />
      </Grid>
      <Grid item xs={3}>
        <RealtimeCard color={"gray"} title={"용존산소량"} icon={<Gauge />} />
      </Grid> */}
      <Grid item xs={4}>
        {data && (
          <RealtimeChart
            color={"indigo"}
            data={realtimeData(createData(data, "temp"), "white")}
            options={realtimeOptions(24, 34, 2, "white")}
            title={"온도"}
            content={`정상 범위: 28 ~ 32  측정값: ${
              data.length > 0 && data[data.length - 1].temp
            }`}
          />
        )}
      </Grid>
      <Grid item xs={4}>
        {data && (
          <RealtimeChart
            color={"yellow"}
            data={realtimeData(createData(data, "ph"), "white")}
            options={realtimeOptions(0, 10, 2, "white")}
            title={"PH"}
            content={`정상 범위: 28 ~ 32  측정값: ${
              data.length > 0 && data[data.length - 1].ph
            }`}
          />
        )}
      </Grid>
      <Grid item xs={4}>
        {data && (
          <RealtimeChart
            color={"red"}
            data={realtimeData(createData(data, "dox"), "white")}
            options={realtimeOptions(0, 100, 20, "white")}
            title={"DO"}
            content={`정상 범위: 28 ~ 32  측정값: ${
              data.length > 0 && data[data.length - 1].dox
            }`}
          />
        )}
      </Grid>
      <Grid item xs={4}>
        {data && (
          <RealtimeChart
            color={"gray"}
            data={realtimeData(createData(data, "brix"), "white")}
            options={realtimeOptions(0, 100, 20, "white")}
            title={"당도"}
            content={`정상 범위: 28 ~ 32  측정값: ${
              data.length > 0 && data[data.length - 1].brix
            }`}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default RealtimeChartsContainer;
