<<<<<<< HEAD
import React from "react";
import css from "./Header.module.css";
=======
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userAction';

import css from './Header.module.css';
>>>>>>> 5abf9a67a509bf3816aa2df79cc0166cd8ba5a20

const Header = () => {
const dispatch = useDispatch()

const logOut = () => {
  dispatch(getUser(null))
}
  return (
    <header className={css.header}>
      <div className={css.header__wrapper}>
        <a href="/">
          <h1 className={css.header__title}>Wallet</h1>
        </a>

        <form action="">
          <label className={css.header__login_avatar} htmlFor="avatar"></label>

          <input
            id="avatar"
            type="file"
            name="avatar"
            accept=".jpg,.jpeg,.png"
            hidden
          />
        </form>

        <div className={css.header__login_wrapper}>
          <p className={css.header__login_name}>Имя</p>
<<<<<<< HEAD

          <button className={css.header__logout_button}></button>
=======
          <button onClick={logOut} className={css.header__logout_button}></button>
>>>>>>> 5abf9a67a509bf3816aa2df79cc0166cd8ba5a20
        </div>
      </div>
    </header>
  );
};

export default Header;
