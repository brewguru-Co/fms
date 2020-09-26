import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { GreasePencil, Thermometer, Water, Gauge } from "mdi-material-ui";
import OptimalCard from "../components/OptimalCard";
import InfoCard from "../components/InfoCard";

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function InfoContainer() {
  /* (@TODO) API 연동 필요 (startedAt, finishedAt) */
  const [startedAt, setStartedAt] = useState(new Date("2020-09-17 00:00"));
  const [finishedAt, setFinishedAt] = useState(null);
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const optimalValues = {
    temp: 24,
    ph: 2.6,
    dox: 60,
    brix: 0.4,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = (now - startedAt) / 1000;
      setTime({
        day: formatTime(Math.floor(diff / 60 / 60 / 24)),
        hour: formatTime(Math.floor((diff / 60 / 60) % 24)),
        minute: formatTime(Math.floor((diff / 60) % 60)),
        second: formatTime(Math.floor(diff % 60)),
      });
    }, 1000);
    if (finishedAt) clearInterval(interval);
    return () => {
      if (!finishedAt) clearInterval(interval);
    };
  }, [startedAt, finishedAt]);

  const onStart = () => {
    setFinishedAt(null);
    setStartedAt(new Date());
  };

  const onFinish = () => {
    setFinishedAt(new Date());
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={4}>
        <InfoCard
          tank="Tank 1"
          tea="Original"
          startedAt={startedAt}
          finishedAt={finishedAt}
          day={time.day}
          hour={time.hour}
          minute={time.minute}
          second={time.second}
          onStart={onStart}
          onFinish={onFinish}
        />
      </Grid>
      <Grid item xs={12} xl={8} container spacing={3}>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color={"green"}
            category={"온도 최적값"}
            title={optimalValues.temp}
            icon={<Thermometer />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color={"yellow"}
            category={"PH 최적값"}
            title={optimalValues.ph}
            icon={<GreasePencil />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color={"red"}
            category={"당도 최적값"}
            title={optimalValues.brix}
            icon={<Water />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <OptimalCard
            color={"gray"}
            category={"용존산소량 최적값"}
            title={optimalValues.dox}
            icon={<Gauge />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InfoContainer;
