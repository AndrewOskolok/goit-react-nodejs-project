import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import css from "./Navigation.module.css";

const Navigation = () => {

    return (
      <nav className={css.main__buttons_wrapper}>
        <NavLink exact
        to="/"
        className={classNames(css.main__btn, css.main__btn_home)}
        activeClassName={css.main__btn_active}
      ></NavLink>
      <NavLink
        to="/statistic"
        className={classNames(css.main__btn, css.main__btn_statistic)}
        activeClassName={css.main__btn_active}
      ></NavLink>
      <NavLink
        to="/currency"
        className={classNames(css.main__btn, css.main__btn_course)}
        activeClassName={css.main__btn_active}
      ></NavLink>
      </nav>
    );
  };

export default Navigation;
