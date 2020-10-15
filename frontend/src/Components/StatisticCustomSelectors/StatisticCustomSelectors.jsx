import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import css from './StatisticCustomSelectors.module.css';
import animate from './slide.module.css';

const example = ['Август', 'Сентябрь', 'Октябрь'];
const StatisticCustomSelectors = ({ startValue }) => {
  const [valueSelector, setValueSelector] = useState(startValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeSelector = ({ target }) => {
    setIsOpen(state => !state);
    const selectedOption = target.textContent;
    target.classList.toggle(css.open);
    setValueSelector(selectedOption);
    console.log(target);
  };
  return (
    <div className={css.select}>
      <input className={css.select__input} type="hidden" />
      <div onClick={handleChangeSelector} className={css.select__head}>
        {valueSelector}
      </div>

      <CSSTransition
        in={isOpen}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={animate}
      >
        <ul className={css.select__list} onClick={handleChangeSelector}>
          {example.map(el => (
            <li key={el} className={css.select__item}>
              {el}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
StatisticCustomSelectors.propTypes = {
  startValue: PropTypes.string.isRequired,
};
export default StatisticCustomSelectors;
