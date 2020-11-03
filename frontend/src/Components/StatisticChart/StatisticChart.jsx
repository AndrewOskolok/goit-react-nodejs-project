import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const configData = arrayOfStat => {
  let categories = [];
  let values = [];
  let colors = [];
  if (arrayOfStat.length > 0) {
    categories = arrayOfStat.map(el => el.category);
    values = arrayOfStat.map(el => el.total);
    colors = arrayOfStat.map(el => el.color);
  } else {
    categories = ['Нет расходов'];
    values = [1];
    colors = ['#C0C0C0'];
  }

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
  const data = useMemo(() => configData(arrayOfStat), [arrayOfStat]);
  return (
    <Doughnut
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        devicePixelRatio: 2,
        cutoutPercentage: 70,

        tooltips: {},
        legend: {
          display: false,
        },
      }}
    />
  );
};

export default StatisticChart;
