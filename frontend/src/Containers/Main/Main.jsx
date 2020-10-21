import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Balance from "../../Components/Balance/Balance";
import Navigation from "../../Components/Navigation/Navigation";
import CurrencyRate from "../../Components/CurrencyRate/CurrencyRate";
import Transaction from "../../Components/Transaction/Transaction";
import AddTransaction from "../../Components/addTransaction/AddTransaction";
import TransactionForm from "../../Components/transactionForm/TransactionForm.jsx";
import css from "./Main.module.css";
import { useEffect } from "react";

const Main = () => {
  const [modalWindow, setModalWindow] = useState(false);

  const openModalHandler = () => {
    setModalWindow((state) => !state);
  };

  return (
    <div className={css.main}>
      <Header />
      <div className={css.main__wrapper}>
        <aside className={css.main__aside}>
          <Navigation />
          <Balance />
          <div className={css.main__currency_wrapper}>
            <CurrencyRate />
          </div>
        </aside>
        <div className={css.content__wrapper}>
          <Transaction />
        </div>
      </div>
      <AddTransaction modalHandler={openModalHandler} />
      {modalWindow && (
        <TransactionForm modalHandler={openModalHandler} status={modalWindow} />
      )}
    </div>
  );
};

export default Main;
