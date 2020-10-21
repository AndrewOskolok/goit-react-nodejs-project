import React, { useEffect } from "react";
import styles from "./Transaction.module.css";
import {
  deteteCurrentTransaction,
  getCurrentTransactions,
  getFilteredTransactions,
} from "../../redux/opertions/transactionsOperation";
import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const dispatch = useDispatch();
  // const userToken = useSelector((state) => state.auth.token);
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjkwNjMwNmQ2NTY4YTAwMTcwMjk2M2EiLCJpYXQiOjE2MDMyOTgwNTQsImV4cCI6MTYwMzI5OTg1NH0.qzBXAsLFR1kaTOJHGAUgMhovFp_U1ee8uw8HtgFBC5k";
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getCurrentTransactions(userToken));
  }, []);

  const transactionFilter = ({ target: { value } }) => {
    dispatch(getFilteredTransactions(value, userToken));
  };

  const deleteTransaction = ({ target: { value } }) => {
    dispatch(deteteCurrentTransaction(value, userToken, transactions));
  };

  return (
    <>
      <div className={styles.transaction__filter}>
        <button
          onClick={transactionFilter}
          className={styles.transaction__filter_button}
        >
          Все
        </button>
        <button
          onClick={transactionFilter}
          className={styles.transaction__filter_button}
          value="income"
        >
          Доходы
        </button>
        <button
          onClick={transactionFilter}
          className={styles.transaction__filter_button}
          value="expense"
        >
          Расходы
        </button>
      </div>
      <ul className={styles.transaction__header}>
        <li className={styles.transaction__header_item}>Дата</li>
        <li className={styles.transaction__header_item}>Тип</li>
        <li className={styles.transaction__header_item}>Категория</li>
        <li className={styles.transaction__header_item}>Комментарий</li>
        <li className={styles.transaction__header_item}>Сумма</li>
        <li className={styles.transaction__header_item}>Баланс</li>
      </ul>
      {transactions.map((item) => (
        <div className={styles.transaction__list} key={item.id}>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Дата</span>
            <span className={styles.transaction__list_item_value}>
              {`${item.date}.${item.month}.${item.year}`}
            </span>
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Тип</span>
            <span className={styles.transaction__list_item_value}>
              {item.type}
            </span>
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Категория</span>
            <span className={styles.transaction__list_item_value}>
              {item.category}
            </span>
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>
              Комментарий
            </span>
            <span className={styles.transaction__list_item_value}>
              {item.description}
            </span>
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Сумма</span>
            <span className={styles.transaction__list_item_value}>
              {item.amount}
            </span>
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Баланс</span>
            <span className={styles.transaction__list_item_value}>
              {item.balanceAfter}
            </span>
          </p>
          <button className={styles.transaction__list_edit}></button>
          <button
            onClick={deleteTransaction}
            value={item.id}
            className={styles.transaction__list_delete}
          ></button>
        </div>
      ))}
    </>
  );
};

export default Transaction;
