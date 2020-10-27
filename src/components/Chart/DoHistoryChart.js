import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { findMaxData, findMinData, getYAxes } from '../../lib/chart';
import { makeStyles } from '@material-ui/core/styles';
import { GRAY, RED } from '../../assets/jss';
import styles from '../../assets/jss/components/historyChartStyle';

const useStyles = makeStyles(styles);

const datasetOptions = {
  fill: false,
  lineTension: 0,

  backgroundColor: GRAY[5],
  borderColor: GRAY[5],
  borderWidth: 1,

  pointBackgroundColor: GRAY[5],
  pointBorderWidth: 1,
  pointRadius: 1,

  pointHoverRadius: 1,
  pointHoverBackgroundColor: GRAY[7],
  pointHoverBorderColor: GRAY[7],
  pointHoverBorderWidth: 1,
};

const avgDatasetOptions = {
  fill: false,
  lineTension: 0,

  backgroundColor: RED[5],
  borderColor: RED[5],
  borderWidth: 1,

  pointBackgroundColor: RED[5],
  pointBorderWidth: 1,
  pointRadius: 1,

  pointHoverRadius: 1,
  pointHoverBackgroundColor: RED[7],
  pointHoverBorderColor: RED[7],
  pointHoverBorderWidth: 1,
};

let myChart;

function DoHistoryChart(props) {
  const { datas, isOptimal } = props;
  const length = datas[0].length;
  const classes = useStyles({ length });
  const chartRef = useRef();
  const yAxisRef = useRef();

  const isOptimalData = (index) => (datas.length > 1 && index === datas.length - 1) || isOptimal;
  const gData = {
    datasets: datas.map((data, index) =>
      isOptimalData(index)
        ? {
            ...avgDatasetOptions,
            data,
          }
        : {
            ...datasetOptions,
            data,
          },
    ),
  };

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }
    const chart = chartRef.current.getContext('2d');
    const yChart = yAxisRef.current.getContext('2d');

    myChart = new Chart(chart, {
      type: 'line',
      data: gData,
      options: {
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,
        animation: {
          duration: 0,
          onComplete: function () {
            const sourceCanvas = this.chart.canvas;
            const copyWidth = this.chart.scales['y-axis-0'].width - 5;
            const copyHeight =
              this.chart.scales['y-axis-0'].height + this.chart.scales['y-axis-0'].top + 10;
            const targetElementWidth = this.canvas.clientWidth;
            const targetElementHeight = this.canvas.clientHeight;

            yChart.canvas.width = copyWidth;
            yChart.canvas.height = copyHeight;

            yChart.canvas.style.width = `${copyWidth}px`;
            yChart.canvas.style.height = `${copyHeight}px`;
            yChart.drawImage(sourceCanvas, 0, 0, targetElementWidth, targetElementHeight);
          },
        },
        legend: {
          display: false,
        },
        hover: {
          mode: 'index',
          intersect: false,
          animationDuration: 0,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          animationDuration: 0,
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              ticks: {
                stepSize: length > 1000 ? 25 : 5,
              },
            },
          ],
          yAxes: getYAxes(findMaxData(datas), findMinData(datas), 0.5),
        },
      },
    });
  }, [gData, length, datas]);

  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.container}>
        <div className={classes.content}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <canvas className={classes.y} ref={yAxisRef} height={450}></canvas>
    </div>
  );
}

export default DoHistoryChart;
