import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../../redux/selectors/selectors";
import { getUser } from "../../redux/actions/userAction";

import css from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => getUserState(state));

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(getUser(null));
  };
  return (
    <header className={css.header}>
      <div className={css.header__wrapper}>
        <a href="/">
          <h1 className={css.header__title}>Wallet</h1>
        </a>

        <div className={css.header__login_wrapper}>
          <p className={css.header__login_name}>{user.username}</p>

          <form>
            <label
              className={css.header__login_avatar}
              htmlFor="avatar"
            ></label>
            <img src={user.userAvatar} alt="" />

            <input
              id="avatar"
              type="file"
              name="avatar"
              accept=".jpg,.jpeg,.png"
              hidden
            />
          </form>

          <button
            onClick={logOut}
            className={css.header__logout_button}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
