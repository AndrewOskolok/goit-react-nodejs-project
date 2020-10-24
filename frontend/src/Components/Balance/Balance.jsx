import React from "react";
import { useSelector } from "react-redux";
import css from "./Balance.module.css";

const Balance = () => {
  const balance = useSelector((state) => state.user.currentBalance);
  return (
    <div className={css.balance}>
      <p className={css.balance__name}>Ваш баланс</p>
      <p className={css.balance__total}>
        <span className={css.balance__marker}>$ </span>
        {balance}
      </p>
    </div>
  );
};

export default Balance;
