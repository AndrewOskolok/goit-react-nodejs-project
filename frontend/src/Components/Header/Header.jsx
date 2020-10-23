import React from 'react';
import { useSelector } from 'react-redux';
import css from './Header.module.css';

const Header = () => {
  // const userName = useSelector(state => state.user.userName);
  
  return (
    <header className={css.header}>
      <div className={css.header__wrapper}>
        <a href="/">
          <h1 className={css.header__title}>Wallet</h1>
        </a>
        <div className={css.header__login_wrapper}>
          <p className={css.header__login_name}>
            Имя
            {/* {userName} */}
          </p>
          <button className={css.header__logout_button}></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
