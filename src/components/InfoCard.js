import React, { useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessAlarms from "@material-ui/icons/AccessAlarms";
import DateRange from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "./Card/Card";
import CardIcon from "./Card/CardIcon";
import CardHeader from "./Card/CardHeader";
import CardFooter from "./Card/CardFooter";
import styles from "../assets/jss/components/infoCardStyle";

const useStyles = makeStyles(styles);

function InfoCard(props) {
  const [sDisabled, setSDisabled] = useState(false);
  const [fDisabled, setFDisabled] = useState(false);
  const {
    startedAt,
    finishedAt,
    day,
    hour,
    minute,
    second,
    tank,
    tea,
    onStart,
    onFinish,
  } = props;
  const classes = useStyles();

  const handleStart = () => {
    onStart();
    setSDisabled(true);
  };
  const handleFinish = () => {
    onFinish();
    setFDisabled(true);
  };

  return (
    <Card>
      <CardHeader color="indigo" stats icon>
        <CardIcon color="indigo">
          <AccessAlarms />
        </CardIcon>
        <>
          {tank && tea ? (
            <p className={classes.category}>{`${tank} (${tea})`}</p>
          ) : (
            <div className={classes.container}>
              <Skeleton className={classes.skeleton} variant="text" />
            </div>
          )}
        </>
        <div className={classes.container}>
          <div className={classNames(classes.count, classes.day)}>
            <Typography className={classes.number} component="span">
              {day}
            </Typography>
            <Typography component="span">일</Typography>
          </div>
          <div className={classNames(classes.count, classes.hour)}>
            <Typography className={classes.number} component="span">
              {hour}
            </Typography>
            <Typography component="span">시</Typography>
          </div>
          <div className={classNames(classes.count, classes.minute)}>
            <Typography className={classes.number} component="span">
              {minute}
            </Typography>
            <Typography component="span">분</Typography>
          </div>
          <div className={classNames(classes.count, classes.second)}>
            <Typography className={classes.number} component="span">
              {second}
            </Typography>
            <Typography component="span">초</Typography>
          </div>
        </div>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <div>
            <DateRange />
            {`${format(startedAt, "yyyy-MM-dd HH:mm")} ~ ${
              finishedAt ? format(finishedAt, "yyyy-MM-dd HH:mm") : ""
            }`}
          </div>
          <div>
            <Button
              size="small"
              variant="outlined"
              onClick={handleStart}
              disabled={sDisabled}
            >
              시작
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleFinish}
              disabled={fDisabled}
            >
              종료
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default React.memo(InfoCard);
