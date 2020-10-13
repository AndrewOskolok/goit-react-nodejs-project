import React from "react";
import css from "./Login.module.css";

const Authorization = () => {
  return  <div
  className={css.loginForm}>
  <form onSubmit>
    {/* --------- email input --------- */}
    <input
      className={css.loginInputEmail}
      id="email"
      type="email"
      placeholder="E-mail"
      name="email"
      onChange
      required
      autoFocus
    />

    {/* --------- password input --------- */}

    <input
      className={css.loginInputPassword}
      placeholder="Пароль"
      id="password"
      type="password"
      name="password"
      onChange
      minLength="6"
      maxLength="15"
      required
    />

    {/* --------- buttons login/register --------- */}
    <div>
      <button type="submit"
      className={css.loginInput}>
        Вход
      </button>


      <button
        type="button"  className={css.loginRegister}
      >
        Регистрация
      </button>
    </div>

    {/* --------- /form end --------- */}
  </form>
</div>;
};

export default Authorization;
