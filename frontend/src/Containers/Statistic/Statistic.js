import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticCustomSelectors from '../../Components/StatisticCustomSelectors/StatisticCustomSelectors';
import StatisticList from '../../Components/StatisticList/StatisticList';
import StatisticChart from '../../Components/StatisticChart/StatisticChart';
import getFilteredStatistic from '../../redux/opertions/statisticOperation';
import css from './Statistic.module.css';

const Statistic = () => {
  const dispatch = useDispatch();
  const arrayOfStat = useSelector(state => state.statistics.items);
  const { typeOfAmount } = useSelector(state => state.statistics);
  const { balance } = useSelector(state => state.statistics);
  const { loader } = useSelector(state => state);

  // useEffect(() => {
  //   dispatch(getFilteredStatistic());
  // }, []);

  return (
    <section className={css.statistic}>
      <h2 className={css.statistic__title}>Статистика</h2>
      <div className={css.statistic__wrapper}>
        <div className={css.statistic__chart_wrapper}>
          <StatisticChart arrayOfStat={arrayOfStat} />
          <p className={css.statistic__chart_balance}>$ {balance}</p>
        </div>

        <div className={css.statistic__info_wrapper}>
          <div className={css.statistic__info_select}>
            <StatisticCustomSelectors />
          </div>

          <div className={css.statistic__group}>
            <div className={css.statistic__group_header}>
              <p className={css.statistic__group_title}>Категория</p>
              <p className={css.statistic__group_title}>Сумма</p>
            </div>
            <StatisticList arrayOfStat={arrayOfStat} />
            <div className={css.statistic__group_result}>
              <div className={css.statistic__group_result_expense}>
                <p className={css.statistic__group_result_expense_info}>
                  Расходы:
                </p>
                <p className={css.statistic__group_result_expense_info}>
                  {typeOfAmount.expense}
                </p>
              </div>
              <div className={css.statistic__group_result_income}>
                <p className={css.statistic__group_result_income_info}>
                  Доходы:
                </p>
                <p className={css.statistic__group_result_income_info}>
                  {typeOfAmount.income}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
