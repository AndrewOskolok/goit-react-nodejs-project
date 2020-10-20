import React, { useEffect } from "react";
import styles from "./Transaction.module.css";
import getCurrentTransactions from "../../redux/opertions/transactionsOperation";
import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const dispatch = useDispatch();
  // const userToken = useSelector((state) => state.auth.token);
  const transactions = useSelector((state) => state.transactions);
  console.log(transactions);

  useEffect(() => {
    dispatch(
      getCurrentTransactions(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjhmNzdhZTZjYmU4NDAwMTcwYzc3NDkiLCJpYXQiOjE2MDMyMzc4MDYsImV4cCI6MTYwMzIzOTYwNn0.ukX3bNK8dhKOX6bWxriTCWRbU2DjK95ijFFsIDGbjkA"
      )
    );
  }, []);

  return (
    <>
      <div className={styles.transaction__filter}>
        <button className={styles.transaction__filter_button}>Всі</button>
        <button className={styles.transaction__filter_button}>Доходи</button>
        <button className={styles.transaction__filter_button}>Витрати</button>
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
          <button className={styles.transaction__list_delete}></button>
        </div>
      ))}
    </>
  );
};

export default Transaction;
