import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Balance from "../../Components/Balance/Balance";
import Navigation from "../../Components/Navigation/Navigation";
import CurrencyRate from "../../Components/CurrencyRate/CurrencyRate";
import Transaction from "../../Components/Transaction/Transaction";
import AddTransaction from "../../Components/addTransaction/AddTransaction";
import TransactionForm from "../../Components/TransactionForm/TransactionForm";
import transactionOperations from "../../redux/opertions/formOperations"
// import { CSSTransition } from "react-transition-group";
// import formAnimation from "../../Components/TransactionForm/transactionFormAnimation.module.css";
import css from "./Main.module.css";
import { useEffect } from "react";
import { connect } from "react-redux";

const Main = ({ getCategories }) => {
  const [modalWindow, setModalWindow] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories])

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
      {/* <CSSTransition in={modalWindow} timeout={250} onEnter={() => { console.log("GO ANIME!!!") }} classNames={formAnimation} mountOnEnter unmountOnExit> */}
        {modalWindow && (
          <TransactionForm modalHandler={openModalHandler} status={modalWindow} />
        )}
      {/* </CSSTransition> */}
    </div>
  );
};

const mapDispatchToProps = {
  getCategories: transactionOperations.getCategoriesOperation,
};

export default connect(null, mapDispatchToProps)(Main);
