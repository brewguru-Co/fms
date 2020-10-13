import moment from 'moment';
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
      title: (item) =>
        moment(new Date(item[0].xLabel)).format('MMM D YYYY, hh:mm A'),
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

export const addAvg = (datas) => {
  const itemNumbers = datas.length;
  const lengths = datas.map(data => data.length);
  const maxLengthOfItems = Math.max(...lengths)
  const indexOfMax = lengths.indexOf(Math.max(...lengths))

  const avgArr = [];
  for(let i = 0; i < maxLengthOfItems; i += 1 ) {
    let sum = {
      temp: 0,
      ph: 0,
      dox: 0,
      brix: 0,
    };
    for(let j=0; j < itemNumbers; j+=1) {
      const value = datas[j][i] || {
        temp: 0,
        ph: 0,
        dox: 0,
        brix: 0,
      };
      sum.temp += value.temp;
      sum.ph += value.ph;
      sum.dox += value.dox;
      sum.brix += value.brix;
    }
    avgArr.push({
      temp: parseFloat((sum.temp / itemNumbers).toFixed(2)),
      ph: parseFloat((sum.ph / itemNumbers).toFixed(2)),
      dox: parseFloat((sum.dox / itemNumbers).toFixed(2)),
      brix: parseFloat((sum.brix / itemNumbers).toFixed(2)),
      timestamp: datas[indexOfMax][i].timestamp,
    })
  }

  datas.push(avgArr)
  return datas;
}