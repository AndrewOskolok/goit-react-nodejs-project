import React from 'react';
import css from './StatisticList.module.css';

const example = [
  {
    spending: '8 700.00',
    category: 'Основные расходы',
    id: 1,
  },
  { category: 'Продукты', spending: '3 800.74', id: 2 },
  { category: 'Продукты', spending: '3 800.74', id: 3 },
  { category: 'Продукты', spending: '3 800.74', id: 4 },
  { category: 'Продукты', spending: '3 800.74', id: 5 },
  { category: 'Товары для дома', spending: '3 800.74', id: 6 },
  { category: 'Продукты', spending: '800,00', id: 7 },
  { category: 'Продукты', spending: '3 800.74', id: 8 },
  { category: 'Товары для дома', spending: '3 800.74', id: 9 },
];
const StatisticList = ({ arrayOfStat }) => {
  return (
    <ul className={css.statistic_group__list}>
      {arrayOfStat.map(el => (
        <li className={css.statistic_group__list_item} key={el.category}>
          <span
            style={{ backgroundColor: el.color }}
            className={css.statistic_group__list_item_square}
          ></span>
          <p className={css.statistic_group__list_item_info}>{el.category}</p>
          <p className={css.statistic_group__list_item_info}>{el.total}</p>
        </li>
      ))}
    </ul>
  );
};

export default StatisticList;
