import React from "react";
import classNames from "classnames";
import Header from "../../Components/Header/Header";
import Tranaction from '../../Components/Transaction/Transaction'
import css from "./Main.module.css";

const Main = () => {
  return (
    // <div className={css.main}>
    //   <Header />
    //   <div className={css.main__wrapper}>
    //     <Tranaction/>
    //   </div>
    // </div>
    <div className={css.qw}>
      <div className={css.wp}>
<Tranaction/>
      </div>
    </div>
    
    
  );
};

export default Main;
