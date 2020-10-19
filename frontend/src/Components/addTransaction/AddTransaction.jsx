import React from 'react';
import css from './AddTransaction.module.css';

const AddTransaction = ({modalHandler}) => {
  return (
      <button className={css.add__transaction_btn} type="button" onClick={() => modalHandler()}>+</button>
  );
};

export default AddTransaction;