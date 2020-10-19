import React, {useState} from 'react';
import css from './AddTransaction.module.css';

const AddTransaction = () => {
  const [isShowModal, changeIsShowModal] = useState(false);

  const showModal = () => changeIsShowModal(true);

  return (
    <div className={css.add__transaction}>
        <button className={css.add__transaction_btn} type="button" onClick={showModal}>+</button>
    </div>
  );
};

export default AddTransaction;