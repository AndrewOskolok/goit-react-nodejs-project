import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import css from './StatisticCustomSelectors.module.css';
import animate from './slide.module.css';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhiNmEwMmNhZTMyNTE0N2ZmODhmODUiLCJzaWQiOiI1ZjhmMTJiOWI1OTk3MjAwMTc2YjNjMzciLCJpYXQiOjE2MDMyMTE5NjEsImV4cCI6MTYwMzIxMzc2MX0.pd6sI-fdFYPDkIBJFubXS-FjafbTCWlej6JofdGUqjE';
const StatisticCustomSelectors = ({ months, years }) => {
  const history = useHistory();
  const location = useLocation();
  const [valueSelectorMonth, setValueSelectorMonth] = useState(null);
  const [valueSelectorYear, setValueSelectorYear] = useState(null);
  useEffect(() => {
    if (location.search) {
      const { year, month } = queryString.parse(location.search);
      if (year && month) {
        setValueSelectorYear(year);
        setValueSelectorMonth(month);
        return;
      }
    }

    setValueSelectorMonth(months[months.length - 1]);
    setValueSelectorYear(years[0]);
  }, []);
  useEffect(() => {
    if (valueSelectorMonth && valueSelectorYear) {
      history.push({
        ...location,
        search: `month=${valueSelectorMonth}&year=${valueSelectorYear}`,
      });
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
