import React from "react";
import styles from "./Transaction.module.css";

const Transaction = () => {
  return (
    <>
      <div className={styles.transaction__header}>
        <span className={styles.transaction__header_item}>Дата</span>
        <span className={styles.transaction__header_item}>Тип</span>
        <span className={styles.transaction__header_item}>Категория</span>
        <span className={styles.transaction__header_item}>Комментарий</span>
        <span className={styles.transaction__header_item}>Сумма</span>
        <span className={styles.transaction__header_item}>Баланс</span>
      </div>
      <div className={styles.transaction__list}>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Дата</span>
          <span className={styles.transaction__list_item_value}>04.01.19</span>
        </p>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Тип</span>
          <span className={styles.transaction__list_item_value}>-</span>
        </p>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Категория</span>
          <span className={styles.transaction__list_item_value}>Разное</span>
        </p>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Комментарий</span>
          <span className={styles.transaction__list_item_value}>
            Подарок жене
          </span>
        </p>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Сумма</span>
          <span className={styles.transaction__list_item_value}>300.00</span>
        </p>
        <p className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Баланс</span>
          <span className={styles.transaction__list_item_value}>6 900.00</span>
        </p>
        <button className={styles.transaction__list_edit}></button>
        <button className={styles.transaction__list_delete}></button>
      </div>
    </>
  );
};

export default Transaction;
