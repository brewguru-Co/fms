import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import styles from "../../assets/jss/components/realtimeChartStyle";

const useStyles = makeStyles(styles);

function RealtimeChart(props) {
  const { color, data, options, title } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color}>
        <Line data={data} options={options} />
      </CardHeader>
      <CardBody>
        <h1 className={classes.title}>{title}</h1>
      </CardBody>
    </Card>
  );
}

export default RealtimeChart;
