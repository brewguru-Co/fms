import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from './Card/Card';
import CardIcon from './Card/CardIcon';
import CardHeader from './Card/CardHeader';
import CardFooter from './Card/CardFooter';
import styles from '../assets/jss/components/optimalCardStyle';

const useStyles = makeStyles(styles);

function OptimalCard(props) {
  const { color, title, category, content, icon } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>{icon}</CardIcon>
        <p className={classes.category}>{category}</p>
        <>
          {title ? (
            <h2 className={classes.title}>{title}</h2>
          ) : (
            <div className={classes.container}>
              <Skeleton className={classes.skeleton} variant='text' />
            </div>
          )}
        </>
      </CardHeader>
      <CardFooter stats>
        <span className={classes.statsTitle}>최적 범위</span>
        <div className={classes.stats}>{content}</div>
      </CardFooter>
    </Card>
  );
}

export default OptimalCard;
