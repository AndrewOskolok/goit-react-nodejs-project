import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import StatisticCustomSelectors from '../../Components/StatisticCustomSelectors/StatisticCustomSelectors';
import StatisticList from '../../Components/StatisticList/StatisticList';
import StatisticChart from '../../Components/StatisticChart/StatisticChart';
import getFilteredStatistic from '../../redux/opertions/statisticOperation';
import Spinner from '../../Components/Spinner/Spinner';
import { clearStatistic } from '../../redux/actions/statisticAction';
import { loaderToggle } from '../../redux/actions/loaderAction';

import notFound from '../../images/icons/notFound.svg';
import serverDown from '../../images/icons/serverDown.svg';
import css from './Statistic.module.css';

const Statistic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const token = useSelector(state => state.user.accessToken);
  const sid = useSelector(state => state.user.refreshToken);
  const { user } = useSelector(state => state);
  const arrayOfStat = useSelector(state => state.statistics.items);
  const { typeOfAmount } = useSelector(state => state.statistics);
  const { balance } = useSelector(state => state.statistics);
  const { loader } = useSelector(state => state);
  const [years, setYears] = useState([]);
  const [nothingToShow, setNothingToShow] = useState(null);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const goToTransactions = () => {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    };
    const requestForTimes = async () => {
      axios.defaults.baseURL =
        'https://goit-react-nodejs-project.herokuapp.com';
      dispatch(loaderToggle());
      try {
        const result = await axios.get(`/transactions/time`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);

        const years = [...result.data.map(el => Object.keys(el))].flat();

        if (years) {
          setAvailableDates(result.data);
          setYears(years);
        }

        if (years.length === 0) {
          setNothingToShow('transactions not found');
          setError(404);
          goToTransactions();
        }
      } catch (error) {
        if (error.response.status === 500) {
          setError(500);
          setNothingToShow('Server capoot');

          return;
        }
      } finally {
        dispatch(loaderToggle());
      }
    };
    requestForTimes();
  }, [history, dispatch]);

  useEffect(() => {
    if (location.search) {
      const { year, month } = queryString.parse(location.search);
      if (year && month) {
        dispatch(
          getFilteredStatistic({
            month,
            year,
            setError,
            setNothingToShow,
          }),
        );
      }
    }
    return () => {
      dispatch(clearStatistic([]));
    };
  }, [location.search, dispatch]);

  return (
    <section className={css.statistic}>
      {!loader && <Spinner />}
      {loader && (
        <>
          {error && years.length === 0 && (
            <div className={css.show__content}>
              <img
                src={
                  (error === 404 && notFound) || (error === 500 && serverDown)
                }
                alt="content not found"
              />

              <p>{nothingToShow ? nothingToShow : 'Something went wrong'}</p>
            </div>
          )}
          {!error && years.length > 0 && (
            <>
              <h2 className={css.statistic__title}>Статистика</h2>
              <div className={css.statistic__wrapper}>
                <div className={css.statistic__chart_wrapper}>
                  {arrayOfStat.length > 0 && (
                    <>
                      <StatisticChart />
                      <p className={css.statistic__chart_balance}>
                        $ {balance}
                      </p>
                    </>
                  )}
                </div>

                <div className={css.statistic__info_wrapper}>
                  <div className={css.statistic__info_select}>
                    <StatisticCustomSelectors
                      years={years}
                      availableDates={availableDates}
                    />
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
        </>
      )}
    </section>
  );
};

export default Statistic;
