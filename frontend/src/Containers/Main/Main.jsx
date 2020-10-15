import React from "react";
import classNames from "classnames";
import Header from "../../Components/Header/Header";
import Balance from "../../Components/Balance/Balance";
import css from "./Main.module.css";

const Main = () => {
  return (
    <div className={css.main}>
      <Header />
      <div className={css.main__wrapper}>
<Balance/>
      </div>
    </div>
  );
};

export default Main;
