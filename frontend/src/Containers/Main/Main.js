import React from 'react';
import Header from '../../Components/Header/Header';
import CurrencyRate from '../../Components/CurrencyRate/CurrencyRate';
import css from './Main.module.css';

const Main = () => {
  return (
    <div className={css.main}>
      <Header />
      <CurrencyRate />
      {/* Other componnets */}
    </div>
  );
};

export default Main;
