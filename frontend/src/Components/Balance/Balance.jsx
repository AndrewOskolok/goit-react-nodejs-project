import React from 'react';
import { useSelector } from 'react-redux';
import { getUserState } from "../../redux/selectors/selectors";
import css from './Balance.module.css';

const Balance = () => {
  const user = useSelector((state) => getUserState(state));
  
  return (
    <div className={css.balance}>
      <p className={css.balance__name}>Ваш баланс</p>
      <p className={css.balance__total}>
        <span className={css.balance__marker}>$ </span>
        {user.currentBalance}
      </p>
    </div>
  );
};

export default Balance;
