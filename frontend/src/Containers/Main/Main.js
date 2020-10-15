import React from "react";
import Header from "../../Components/Header/Header";
import Navigation from "../../Components/Navigation/Navigation";
import css from "./Main.module.css";

const Main = () => {
  return (
    <div className={css.main}>
      <Header />
      <Navigation />
    </div>
  );
};

export default Main;
