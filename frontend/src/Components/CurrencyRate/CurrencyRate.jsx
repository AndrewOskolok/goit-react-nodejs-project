import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './CurrencyRate.module.css';

const CurrencyRate = () => {
  const [rateList, setRateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      );
      const data = result.data.slice(0, 3).map(item => {
        if (item.ccy === 'RUR') {
          item.ccy = 'RUB';
        }
        parseFloat(item.buy).toFixed(2);
        parseFloat(item.sale).toFixed(2);
        return item;
      });
      setRateList(data);
    };
    fetchData();
  }, []);

  return (
    <ul className={css['currency_rate']}>
      <li className={css['currency__rate_item']}>
        <ul className={css['transaction__types']}>
          <li className={css['transaction__types_title']}>Валюта</li>
          <li className={css['transaction__types_title']}>Покупка</li>
          <li className={css['transaction__types_title']}>Продажа</li>
        </ul>
      </li>
      {rateList.map(item => (
        <li className={css['currency__rate_item']} key={item.ccy}>
          <ul className={css['transaction__types']}>
            <li className={css['transaction__types_item']}>{item.ccy}</li>
            <li className={css['transaction__types_item']}>{item.buy}</li>
            <li className={css['transaction__types_item']}>{item.sale}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyRate;
