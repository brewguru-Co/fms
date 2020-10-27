import moment from 'moment';
import _ from 'lodash';
import { findMax, findMin } from './utils';
import { hexToRgb, getColor } from '../assets/jss';

export const realtimeData = (data, color) => ({
  datasets: [
    {
      fill: false,
      lineTension: 0,

      backgroundColor: getColor(color),
      borderColor: getColor(color), // line
      borderWidth: 4,

      pointBackgroundColor: getColor(color),
      pointBorderWidth: 1,
      pointRadius: 4,

      pointHoverRadius: 3,
      pointHoverBackgroundColor: getColor(color),
      pointHoverBorderColor: getColor(color),
      pointHoverBorderWidth: 3,

      data,
    },
  ],
});

export const realtimeOptions = (ymin, ymax, step, color) => ({
  animation: {
    duration: 0,
  },
  layout: {
    padding: {
      left: 25,
      right: 0,
      top: 0,
      bottom: 25,
    },
  },
  legend: {
    display: false,
  },
  hover: {
    mode: 'dataset',
    intersect: true,
  },
  tooltips: {
    displayColors: false,
    callbacks: {
      title: (item) => moment(new Date(item[0].xLabel)).format('MMM D YYYY, hh:mm A'),
    },
  },
  scales: {
    maintainAspectRatio: false,
    xAxes: [
      {
        type: 'time',
        // distribution: "linear",
        time: {
          displayFormats: {
            second: 'HH:mm:ss',
          },
          stepSize: 5,
        },
        gridLines: {
          color: `rgba(${hexToRgb(getColor(color))}, 0.3)`,
          borderDash: [5, 10],
          borderDashOffset: 5,
          drawBorder: false,
          zeroLineBorderDash: [5, 10],
          zeroLineBorderDashOffset: 5,
          zeroLineColor: `rgba(${hexToRgb(getColor(color))}, 0.3)`,
        },
        ticks: {
          padding: 5,
          fontColor: `rgba(${hexToRgb(getColor(color))}, 0.7)`,
          fontSize: 14,
        },
      },
    ],
    yAxes: [
      {
        position: 'left',
        gridLines: {
          color: `rgba(${hexToRgb(getColor(color))}, 0.3)`,
          borderDash: [5, 10],
          borderDashOffset: 5,
          drawBorder: false,
          zeroLineBorderDash: [5, 10],
          zeroLineBorderDashOffset: 5,
          zeroLineColor: `rgba(${hexToRgb(getColor(color))}, 0.3)`,
        },
        ticks: {
          min: ymin,
          max: ymax,
          stepSize: step,
          padding: 10,
          fontColor: `rgba(${hexToRgb(getColor(color))}, 0.7)`,
          fontSize: 14,
        },
      },
    ],
  },
});

export const filterData = (datas, unit) => {
  const HOUR = 60 * 60;
  const DAY = 24 * HOUR;
  const divider = unit === 'hour' ? HOUR : DAY;
  return datas.filter((data) => data.timestamp % divider === 0);
};

export const getOptimalData = (datas) => {
  const counts = datas.length;
  const maxLengthOfItems = Math.max(...datas.map((data) => data.length));
  const paddArr = [];

  for (let i = 0; i < counts; i += 1) {
    const arr = [];
    for (let j = 0; j < maxLengthOfItems; j += 1) {
      let value = datas[i][j];
      if (!value && j > 0) {
        value = arr[j - 1];
        value.timestamp += 60 * 15;
      }
      arr.push(value);
    }
    paddArr.push(arr);
  }

  const avgArr = [];
  for (let i = 0; i < maxLengthOfItems; i += 1) {
    let sum = {
      temp: 0,
      ph: 0,
      dox: 0,
      brix: 0,
      timestamp: 0,
    };
    for (let j = 0; j < counts; j += 1) {
      const value = paddArr[j][i];
      sum.temp += value.temp;
      sum.ph += value.ph;
      sum.dox += value.dox;
      sum.brix += value.brix;
      sum.timestamp = value.timestamp;
    }
    avgArr.push({
      temp: parseFloat((sum.temp / counts).toFixed(2)),
      ph: parseFloat((sum.ph / counts).toFixed(2)),
      dox: parseFloat((sum.dox / counts).toFixed(2)),
      brix: parseFloat((sum.brix / counts).toFixed(2)),
      timestamp: sum.timestamp,
    });
  }

  return avgArr;
};

export const findMaxData = (datas) => {
  const maxes = [];
  datas.forEach((data) => maxes.push(findMax(data, 'y')));
  return Math.max(...maxes);
};

export const findMinData = (datas) => {
  const mins = [];
  datas.forEach((data) => mins.push(findMin(data, 'y')));
  return Math.min(...mins);
};

export const getYAxes = (max, min, alpha, divider = 8) => {
  console.log(Math.round((max - min + 2 * alpha) / divider));
  return [
    {
      ticks: {
        min: min - alpha,
        max: max + alpha,
        stepSize: _.round((max - min + 2 * alpha) / divider, 1),
      },
    },
  ];
};
