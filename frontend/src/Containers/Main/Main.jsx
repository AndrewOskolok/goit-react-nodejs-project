import React from 'react';
import Header from '../../Components/Header/Header';
import Balance from '../../Components/Balance/Balance';
import Navigation from '../../Components/Navigation/Navigation';
import CurrencyRate from '../../Components/CurrencyRate/CurrencyRate';
import Transaction from '../../Components/Transaction/Transaction';
import css from './Main.module.css';

const Main = () => {
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
          <Transaction />
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Main;
