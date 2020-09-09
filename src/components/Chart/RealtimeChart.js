import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";
import styles from "../../assets/jss/components/realtimeChartStyle";

const useStyles = makeStyles(styles);

function RealtimeChart(props) {
  const { color, data, options, title, content } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color}>
        <Line data={data} options={options} />
      </CardHeader>
      <CardBody>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.category}>{content}</p>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          <AccessTime />
          Last 24 Hours
        </div>
      </CardFooter>
    </Card>
  );
}

export default RealtimeChart;
