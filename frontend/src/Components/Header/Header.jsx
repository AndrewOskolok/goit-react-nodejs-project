import React from 'react';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.header__wrapper}>
        <a href="/">
          <h1 className={css.header__title}>Wallet</h1>
        </a>
        <div className={css.header__login_wrapper}>
          <p className={css.header__login_name}>Имя</p>
          <button className={css.header__logout_button}></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
