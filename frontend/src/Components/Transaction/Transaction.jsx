import React, { useEffect, useState } from "react";
import styles from "./Transaction.module.css";
import {
  deteteCurrentTransaction,
  getCurrentTransactions,
  getFilteredTransactions,
} from "../../redux/opertions/transactionsOperation";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../TransactionForm/TransactionForm";

const Transaction = () => {
  const dispatch = useDispatch();
  // const userToken = useSelector((state) => state.auth.token);
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjkyYzU4OTk3OTQyNTAwMTdkNGZiNTkiLCJpYXQiOjE2MDM0NTQzNDUsImV4cCI6MTYwMzQ1NjE0NX0.4xscnNrQATCgHd2A66G4Ms7SejZ9OvnZEQ7xkv4nuCE";
  const transactions = useSelector((state) => state.transactions);

  const [currentTransaction, setCurrentTransaction] = useState({});
  const [modalWindow, setModalWindow] = useState(false);
  const openModalHandler = () => {
    setModalWindow((state) => !state);
  };

  const transactionFilter = ({ target: { value } }) => {
    dispatch(getFilteredTransactions(value, userToken));
  };

  const deleteTransaction = ({ target: { value } }) => {
    dispatch(deteteCurrentTransaction(value, userToken, transactions));
  };

  const editTransaction = ({ target: { value } }) => {
    setCurrentTransaction(transactions.filter((item) => item.id === value)[0]);
    openModalHandler();
  };

  useEffect(() => {
    dispatch(getCurrentTransactions(userToken));
  }, []);

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
            {item.type === "-" ? (
              <span className={styles.transaction__list_item_value}>
                {item.amount}
              </span>
            ) : (
              <span className={styles.transaction__list_item_value_income}>
                {item.amount}
              </span>
            )}
          </p>
          <p className={styles.transaction__list_item}>
            <span className={styles.transaction__list_item_key}>Баланс</span>
            <span className={styles.transaction__list_item_value}>
              {item.balanceAfter}
            </span>
          </p>
          <button
            onClick={editTransaction}
            value={item.id}
            className={styles.transaction__list_edit}
          ></button>
          <button
            onClick={deleteTransaction}
            value={item.id}
            className={styles.transaction__list_delete}
          ></button>
          {item.type === "-" ? (
            <span className={styles.leftBorder_expense}></span>
          ) : (
            <span className={styles.leftBorder_income}></span>
          )}
        </div>
      ))}
      {modalWindow && (
        <TransactionForm
          modalHandler={openModalHandler}
          status={modalWindow}
          currentTransaction={currentTransaction}
        />
      )}
    </>
  );
};

export default Transaction;
