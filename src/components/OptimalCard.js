import React from "react";
import DateRange from "@material-ui/icons/DateRange";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import CardIcon from "./Card/CardIcon";
import CardHeader from "./Card/CardHeader";
import CardFooter from "./Card/CardFooter";
import styles from "../assets/jss/components/optimalCardStyle";

const useStyles = makeStyles(styles);

function OptimalCard(props) {
  const { color, title, category, content, icon } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>{icon}</CardIcon>
        <p className={classes.category}>{category}</p>
        <h2 className={classes.title}>{title}</h2>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <DateRange />
          Last 24 Hours
        </div>
      </CardFooter>
    </Card>
  );
}

export default OptimalCard;
