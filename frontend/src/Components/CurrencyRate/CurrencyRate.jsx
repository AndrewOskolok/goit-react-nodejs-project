import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./CurrencyRate.module.css";

const currencies = { USD: "USD", EUR: "EUR", RUB: "RUB" };

const CurrencyRate = () => {
  const [rateList, setRateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
      try {
        const result = await axios(url);
        const data = result.data.filter((item) => item.ccy !== "BTC");
        setRateList(data);
      } catch {
        console.log("Can’t access " + url + " response. Blocked by browser?");
      }
    };
    fetchData();
  }, []);
  return (
    <div className={css["currency_rate"]}>
      <div className={css["currency__rate_header"]}>
        <ul className={css["currency__rate_header_list"]}>
          <li className={css["currency__rate_header_list_item"]}>Валюта</li>
          <li className={css["currency__rate_header_list_item"]}>Покупка</li>
          <li className={css["currency__rate_header_list_item"]}>Продажа</li>
        </ul>
      </div>
      <div className={css["currency__rate_content"]}>
        <ul className={css["currency__rate_content_list"]}>
          <li className={css["currency__rate_content_list_item"]}>
            {currencies.USD}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[0].buy).toFixed(2) : "N/A"}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[0].sale).toFixed(2) : "N/A"}
          </li>
        </ul>
        <ul className={css["currency__rate_content_list"]}>
          <li className={css["currency__rate_content_list_item"]}>
            {currencies.EUR}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[1].buy).toFixed(2) : "N/A"}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[1].sale).toFixed(2) : "N/A"}
          </li>
        </ul>
        <ul className={css["currency__rate_content_list"]}>
          <li className={css["currency__rate_content_list_item"]}>
            {currencies.RUB}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[2].buy).toFixed(2) : "N/A"}
          </li>
          <li className={css["currency__rate_content_list_item"]}>
            {rateList.length ? parseFloat(rateList[2].sale).toFixed(2) : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrencyRate;
