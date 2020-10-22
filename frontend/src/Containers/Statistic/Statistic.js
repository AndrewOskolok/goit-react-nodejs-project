import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import StatisticCustomSelectors from '../../Components/StatisticCustomSelectors/StatisticCustomSelectors';
import StatisticList from '../../Components/StatisticList/StatisticList';
import StatisticChart from '../../Components/StatisticChart/StatisticChart';
import getFilteredStatistic from '../../redux/opertions/statisticOperation';
import Spinner from '../../Components/Spinner/Spinner';
import { loaderToggle } from '../../redux/actions/loaderAction';
import css from './Statistic.module.css';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjkxMzQ3NGExMzNkZTAwMTc2MWE1NWMiLCJpYXQiOjE2MDMzNTE2NjgsImV4cCI6MTYwMzM1MzQ2OH0.yIvkiydqgqY0dszqO9F_s-JWnkcMaWgbJ7pWi1HtPgE';

const Statistic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const arrayOfStat = useSelector(state => state.statistics.items);
  const { typeOfAmount } = useSelector(state => state.statistics);
  const { balance } = useSelector(state => state.statistics);
  const { loader } = useSelector(state => state);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  const requestForTimes = async () => {
    axios.defaults.baseURL =
      'https://goit-react-nodejs-project.herokuapp.com/transactions/';
    dispatch(loaderToggle());
    try {
      const result = await axios.get(`time`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { years, months } = result.data;
      console.log(result.data);

      setMonths(months);
      setYears(years);
    } catch (error) {
    } finally {
      dispatch(loaderToggle());
    }
  };
  useEffect(() => {
    requestForTimes();
  }, []);

  useEffect(() => {
    if (location.search) {
      const { year, month } = queryString.parse(location.search);
      if (year && month) {
        dispatch(
          getFilteredStatistic({
            month,
            year,
          }),
        );
      }
    }
  }, [location.search]);

  return (
    <section className={css.statistic}>
      {!loader && <Spinner />}
      {loader && years.length > 0 && months.length > 0 && (
        <>
          <h2 className={css.statistic__title}>Статистика</h2>
          <div className={css.statistic__wrapper}>
            <div className={css.statistic__chart_wrapper}>
              {arrayOfStat.length > 0 && (
                <>
                  <StatisticChart />
                  <p className={css.statistic__chart_balance}>$ {balance}</p>
                </>
              )}
            </div>

            <div className={css.statistic__info_wrapper}>
              <div className={css.statistic__info_select}>
                <StatisticCustomSelectors months={months} years={years} />
              </div>

              <div className={css.statistic__group}>
                <div className={css.statistic__group_header}>
                  <p className={css.statistic__group_title}>Категория</p>
                  <p className={css.statistic__group_title}>Сумма</p>
                </div>
                <StatisticList />

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
        </>
      )}
    </section>
  );
};

export default Statistic;
