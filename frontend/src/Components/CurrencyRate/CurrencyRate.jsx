import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './CurrencyRate.module.css';

const CurrencyRate = () => {
  const [rateList, setRateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      const url =
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
      try {
        const result = await axios(proxyurl + url, {
          headers: {
            Origin: 'https://api.privatbank.ua/',
          },
        });
        const data = result.data.slice(0, 3).map(item => {
          if (item.ccy === 'RUR') {
            item.ccy = 'RUB';
          }
          return item;
        });
        setRateList(data);
      } catch {
        console.log('Can’t access ' + url + ' response. Blocked by browser?');
      }
    };
    fetchData();
  }, []);
  return (
    <div className={css['currency_rate']}>
      <div className={css['currency__rate_header']}>
        <ul className={css['currency__rate_header_list']}>
          <li className={css['currency__rate_header_list_item']}>Валюта</li>
          <li className={css['currency__rate_header_list_item']}>Покупка</li>
          <li className={css['currency__rate_header_list_item']}>Продажа</li>
        </ul>
      </div>
      <div className={css['currency__rate_content']}>
        {rateList.map(item => (
          <ul className={css['currency__rate_content_list']} key={item.ccy}>
            <li className={css['currency__rate_content_list_item']}>
              {item.ccy}
            </li>
            <li className={css['currency__rate_content_list_item']}>
              {parseFloat(item.buy).toFixed(2)}
            </li>
            <li className={css['currency__rate_content_list_item']}>
              {parseFloat(item.sale).toFixed(2)}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CurrencyRate;
