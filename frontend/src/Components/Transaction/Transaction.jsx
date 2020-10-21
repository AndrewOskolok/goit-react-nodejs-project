import React from "react";
import styles from "./Transaction.module.css";

const Transaction = () => {
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
