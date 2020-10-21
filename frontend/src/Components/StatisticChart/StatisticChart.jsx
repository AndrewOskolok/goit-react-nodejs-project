import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const configData = arrayOfStat => {
  const categories = arrayOfStat.map(el => el.category);
  const values = arrayOfStat.map(el => el.total);
  const colors = arrayOfStat.map(el => el.color);
  const data = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: [
          '#FED057',
          '#FFD8D0',
          '#FD9498',
          '#C5BAFF',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#24CCA7',
          '#00AD84',
        ],
        borderWidth: 0,
      },
    ],
  };
  return data;
};

const StatisticChart = ({ arrayOfStat }) => {
  return (
    <Doughnut
      data={configData(arrayOfStat)}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        devicePixelRatio: 2,
        cutoutPercentage: 70,

        tooltips: {},
        legend: {
          display: false,
        },
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
      }}
    />
  );
};

export default StatisticChart;
