import React from "react";
import classNames from "classnames";
import Header from "../../Components/Header/Header";
import css from "./Main.module.css";

const Main = () => {
  return (
    <div>
      <Header />
      <div className={css.main}>
        <div className={css.main__buttons_wrapper}>
          <button
            className={classNames(css.main__btn, css.main__btn_home)}
          ></button>

          <button
            className={classNames(css.main__btn, css.main__btn_statistic)}
          ></button>

          <button
            className={classNames(css.main__btn, css.main__btn_course)}
          ></button>
        </div>
        <button className={css.main__balance}></button>
      </div>
    </div>
  );
};

export default Main;
