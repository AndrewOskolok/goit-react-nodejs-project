import React from 'react';
import css from './Balance.module.css';

const Balance = () => {
  return (
      <div className={css.balance}>
          <button className={css.main__balance}>
              <p className={css.balance__name}>Ваш баланс</p>
              <p className={css.balance__total}><span className={css.balance__marker}>$ </span>24 000.00</p> 
          </button> 
</div>
  );
};

export default Balance;