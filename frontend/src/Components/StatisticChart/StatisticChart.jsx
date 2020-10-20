import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
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
        hoverBackgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };
  return data;
};

const StatisticChart = () => {
  const arrayOfStat = useSelector(state => state.statistics.items);
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
