import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Media from "react-media";
import alanBtn from "@alan-ai/alan-sdk-web";
import Header from "../../Components/Header/Header";
import Statistic from "../Statistic/Statistic";
import Balance from "../../Components/Balance/Balance";
import Navigation from "../../Components/Navigation/Navigation";
import CurrencyRate from "../../Components/CurrencyRate/CurrencyRate";
import Transaction from "../../Components/Transaction/Transaction";
import AddTransaction from "../../Components/AddTransaction/AddTransaction.jsx";
import TransactionForm from "../../Components/TransactionForm/TransactionForm";
import transactionOperations from "../../redux/opertions/formOperations";
import { CSSTransition } from "react-transition-group";
import formAnimation from "../../Components/TransactionForm/transactionFormAnimation.module.css";
import "../../helpers/alanBtnStyles.css";
import css from "./Main.module.css";

const Main = ({ history, getCategories }) => {
  const [modalWindow, setModalWindow] = useState(false);
  const openModalHandler = () => {
    setModalWindow((state) => !state);
  };

  useEffect(() => {
    alanBtn({
      key:
        "fae165cb71975b784fc426e228d7d48e2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "statistic") {
          history.push("/statistic");
        } else if (commandData.command === "mainPage") {
          history.push("/");
        } else if (commandData.command === "currencies") {
          history.push("/currency");
        } else if (commandData.command === "goBack") {
          history.goBack();
        } else if (commandData.command === "open") {
          openModalHandler();
        }
      },
    });
    getCategories();
  }, []);

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
          <Switch>
            <Route exact path="/" component={Transaction} />
            <Route exact path="/statistic" component={Statistic} />

            <Media
              query="(min-width: 320px) and (max-width: 767px)"
              render={() => (
                <Route exact path="/currency" component={CurrencyRate} />
              )}
            />

            <Redirect to="/" />
          </Switch>
        </div>
      </div>
      <AddTransaction modalHandler={openModalHandler} />
      <CSSTransition
        in={modalWindow}
        timeout={250}
        classNames={formAnimation}
        mountOnEnter
        unmountOnExit
      >
        <TransactionForm modalHandler={openModalHandler} status={modalWindow} />
      </CSSTransition>
    </div>
  );
};

const mapDispatchToProps = {
  getCategories: transactionOperations.getCategoriesOperation,
};

export default connect(null, mapDispatchToProps)(Main);
