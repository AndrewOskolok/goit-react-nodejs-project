import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import css from './StatisticCustomSelectors.module.css';
import animate from './slide.module.css';

const StatisticCustomSelectors = ({ years, availableDates, loader }) => {
  const history = useHistory();
  const location = useLocation();
  const [valueSelectorMonth, setValueSelectorMonth] = useState(null);
  const [valueSelectorYear, setValueSelectorYear] = useState(null);
  const [months, setMonths] = useState([]);
  const findCorrectMonths = year => {
    const currentYear = availableDates.find(el => {
      return el[`${year}`];
    });
    const allMonths = [...Object.values(currentYear)].flat();
    const months = [...new Set(allMonths)];
    return months;
  };

  useEffect(() => {
    if (location.search) {
      let { year, month } = queryString.parse(location.search);
      if (year && month) {
        if (!years.includes(year)) {
          year = years[years.length - 1];
        }
        const months = findCorrectMonths(year);
        setMonths(months);
        setValueSelectorYear(year);
        if (months.includes(month)) {
          setValueSelectorMonth(month);
          return;
        }
        setValueSelectorMonth(months[months.length - 1]);
        return;
      }
    }
    const correctYear = years[years.length - 1];
    const months = findCorrectMonths(correctYear);
    setMonths(months);
    setValueSelectorMonth(months[months.length - 1]);
    setValueSelectorYear(correctYear);
  }, [years]);

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

    if (!isNaN(selectedOption)) {
      const months = findCorrectMonths(selectedOption);
      setMonths(months);
      const hasMonth = months.includes(valueSelectorMonth);
      if (!hasMonth) {
        setValueSelectorMonth(months[months.length - 1]);
        setValue(selectedOption);
        setOpen(state => !state);
        ref.current.classList.toggle(`${css.select__head_open}`);
        ref.current.classList.toggle(css.open);
        return;
      }
    }
    setValue(selectedOption);
    setOpen(state => !state);
    ref.current.classList.toggle(`${css.select__head_open}`);
    ref.current.classList.toggle(css.open);
  };

  return (
    <>
      {!loader && (
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
      )}
    </>
  );
};

export default StatisticCustomSelectors;
