import React from "react";
import Header from "../../Components/Header/Header";
import Balance from "../../Components/Balance/Balance";
import Navigation from "../../Components/Navigation/Navigation";
import css from "./Main.module.css";

const Main = () => {
  return (
    <div className={css.main}>
      <Header />
      <div className={css.main__wrapper}>
        <Navigation />
        <Balance />
      </div>
    </div>
  );
};

export default Main;
