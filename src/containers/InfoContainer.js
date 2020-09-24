import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InfoCard from "../components/InfoCard";

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function InfoContainer() {
  // const startedAt = new Date("2020-09-17 00:00");
  const [startedAt, setStartedAt] = useState(new Date("2020-09-17 00:00"));
  const [finishedAt, setFinishedAt] = useState(null);
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

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
    <Grid container>
      <Grid item xs={3}>
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
    </Grid>
  );
}

export default InfoContainer;
