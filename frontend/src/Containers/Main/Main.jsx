import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import Header from '../../Components/Header/Header';
import Balance from '../../Components/Balance/Balance';
import Navigation from '../../Components/Navigation/Navigation';
import CurrencyRate from '../../Components/CurrencyRate/CurrencyRate';
import Transaction from '../../Components/Transaction/Transaction';
import AddTransaction from '../../Components/addTransaction/AddTransaction';
import TransactionForm from '../../Components/TransactionForm/TransactionForm';
import css from './Main.module.css';

const Main = () => {
  const [modalWindow, setModalWindow] = useState(false);
  const openModalHandler = () => {
    setModalWindow(state => !state);
  };

  // const dataSetter = value => {
  //   console.log(value);
  // };

  let history = useHistory();

  useEffect(() => {
    alanBtn({
      key:
        'fae165cb71975b784fc426e228d7d48e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: commandData => {
        if (commandData.command === 'statistic') {
          history.push('/statistic');
        } else if (commandData.command === 'mainPage') {
          history.push('/');
        } else if (commandData.command === 'open') {
          openModalHandler();
        }
        // else if (commandData.command === 'setData') {
        //   dataSetter(commandData.input);
        // }
      },
    });
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
