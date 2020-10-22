import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Statistic from "../../Containers/Statistic/Statistic";
import Header from "../../Components/Header/Header";
import Balance from "../../Components/Balance/Balance";
import Navigation from "../../Components/Navigation/Navigation";
import CurrencyRate from "../../Components/CurrencyRate/CurrencyRate";
import Transaction from "../../Components/Transaction/Transaction";
import AddTransaction from "../../Components/addTransaction/AddTransaction";
import css from "./Main.module.css";

const Main = () => {
  const [modalWindow, setModalWindow] = useState(false);

  const openModalHandler = () => {
    setModalWindow((state) => !state);
  };

  return (
    <>
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
      <Route exact path="/transactions" component={Transaction} />
      <Route exact path="/statistic" component={Statistic} />
      <Route exact path="/currency" component={CurrencyRate} />
      <Redirect to="/" />
    </Switch>
            
        </div>
      </div>
        <AddTransaction modalHandler={openModalHandler} />
    </div>

    </>
  );
};

export default Main;
