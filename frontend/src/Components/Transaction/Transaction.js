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
      <ul className={styles.transaction__list}>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Дата</span>
          <span className={styles.transaction__list_item_value}>04.01.19</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Тип</span>
          <span className={styles.transaction__list_item_value}>-</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Категория</span>
          <span className={styles.transaction__list_item_value}>Разное</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Комментарий</span>
          <span className={styles.transaction__list_item_value}>
            Подарок жене
          </span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Сумма</span>
          <span className={styles.transaction__list_item_value}>300.00</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Баланс</span>
          <span className={styles.transaction__list_item_value}>6 900.00</span>
        </li>
      </ul>
      <ul className={styles.transaction__list}>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Дата</span>
          <span className={styles.transaction__list_item_value}>04.01.19</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Тип</span>
          <span className={styles.transaction__list_item_value}>-</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Категория</span>
          <span className={styles.transaction__list_item_value}>Разное</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Комментарий</span>
          <span className={styles.transaction__list_item_value}>
            Подарок жене
          </span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Сумма</span>
          <span className={styles.transaction__list_item_value}>300.00</span>
        </li>
        <li className={styles.transaction__list_item}>
          <span className={styles.transaction__list_item_key}>Баланс</span>
          <span className={styles.transaction__list_item_value}>6 900.00</span>
        </li>
      </ul>
    </>
  );
};

export default Transaction;
