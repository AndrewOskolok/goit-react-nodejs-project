import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import getFilteredStatistic from '../../redux/opertions/statisticOperation';
import css from './StatisticCustomSelectors.module.css';
import animate from './slide.module.css';

const StatisticCustomSelectors = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const months = ['December', 'November', 'September', 'June', 'July'];
  const years = [2019, 2020];
  const [valueSelectorMonth, setValueSelectorMonth] = useState(null);
  const [valueSelectorYear, setValueSelectorYear] = useState(null);
  useEffect(() => {
    let year = null;
    let month = null;
    if (location.search) {
      year = queryString.parse(location.search).year;
      month = queryString.parse(location.search).month;
    }

    if (year) {
      setValueSelectorYear(year);
    }
    if (month) {
      setValueSelectorMonth(month);
      return;
    }
    setValueSelectorMonth(months[months.length - 1]);
    setValueSelectorYear(years[years.length - 1]);
  }, []);
  useEffect(() => {
    if (valueSelectorMonth && valueSelectorYear) {
      history.push({
        ...location,
        search: `month=${valueSelectorMonth}&year=${valueSelectorYear}`,
      });
      dispatch(
        getFilteredStatistic({
          month: valueSelectorMonth,
          year: valueSelectorYear,
        }),
      );
    }
  }, [valueSelectorMonth, valueSelectorYear]);
  const [isOpen, setIsOpenMonth] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const ref = useRef(null);
  const refYear = useRef(null);
  const openSelector = (setOpen, ref) => {
    setOpen(state => !state);
    ref.current.classList.toggle(`${css.select__head_open}`);
    ref.current.classList.toggle(css.open);
  };
  const handleChangeSelector = ({ target }, setValue, setOpen, ref) => {
    const selectedOption = target.textContent;
    setValue(selectedOption);
    setOpen(state => !state);
    ref.current.classList.toggle(`${css.select__head_open}`);
    ref.current.classList.toggle(css.open);
    console.log(valueSelectorMonth, valueSelectorYear);
  };

  return (
    <>
      <div className={css.select}>
        <input className={css.select__input} type="hidden" />
        <div
          onClick={() => openSelector(setIsOpenMonth, ref)}
          ref={ref}
          className={css.select__head}
        >
          {valueSelectorMonth}
        </div>

        <CSSTransition
          in={isOpen}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames={animate}
        >
          <ul
            className={css.select__list}
            onClick={e =>
              handleChangeSelector(
                e,
                setValueSelectorMonth,
                setIsOpenMonth,
                ref,
              )
            }
          >
            {months.map(el => (
              <li key={el} className={css.select__item}>
                {el}
              </li>
            ))}
          </ul>
        </CSSTransition>
      </div>

      <div className={css.select}>
        <input className={css.select__input} type="hidden" />
        <div
          ref={refYear}
          onClick={() => openSelector(setIsOpenYear, refYear)}
          className={css.select__head}
        >
          {valueSelectorYear}
        </div>

        <CSSTransition
          in={isOpenYear}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames={animate}
        >
          <ul
            className={css.select__list}
            onClick={e =>
              handleChangeSelector(
                e,
                setValueSelectorYear,
                setIsOpenYear,
                refYear,
              )
            }
          >
            {years.map(el => (
              <li key={el} className={css.select__item}>
                {el}
              </li>
            ))}
          </ul>
        </CSSTransition>
      </div>
    </>
  );
};

export default StatisticCustomSelectors;
