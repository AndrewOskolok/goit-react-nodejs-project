import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../../redux/selectors/selectors";
import { getUser } from "../../redux/actions/userAction";
import { avatarHandler } from "../../redux/opertions/userOperation";
import css from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => getUserState(state));

  const dispatch = useDispatch();

  const inputAvatar = ({ target }) => {
    dispatch(avatarHandler(target.files[0], user.accessToken));
  };

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

          <form id="avatar">
            <label className={css.header__login_avatar} htmlFor="inputAvatar">
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  className={css.header__login_avatar_user}
                  alt={user.username}
                />
              )}
            </label>

            <input
              onChange={inputAvatar}
              id="inputAvatar"
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
