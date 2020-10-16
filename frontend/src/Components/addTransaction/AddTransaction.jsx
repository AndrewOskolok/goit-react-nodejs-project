import React from 'react';
import css from './AddTransaction.module.css';

const AddTransaction = () => {
  return (
    <div className={css.add__transaction}>
        <button className={css.add__transaction_btn}>+</button>
    </div>
  );
};

export default AddTransaction;