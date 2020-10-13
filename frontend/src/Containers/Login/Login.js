import React from "react";
import css from "./Login.module.css";

const Login = () => {
return <div className={css.login}>
        <div className={css.login__wrapper}>
          <form onSubmit
            className={css.login__wrapper_form}>
            <p className={css.login__wrapper_form_logo}>
               Wallet
            </p>

{/* --------- email input --------- */}

            <label className={css.login__wrapper_form_email_icon}>
              <input
                className={css.login__wrapper_form_email}
                id="email"
                type="email"
                placeholder="E-mail"
                name="email"
                onChange
                required
                autoFocus
              />
            </label>

{/* --------- password input --------- */}

            <label className={css.login__wrapper_form_password_icon}>
              <input
                className={css.login__wrapper_form_password}
                placeholder="Пароль"
                id="password"
                type="password"
                name="password"
                onChange
                minLength="6"
                maxLength="15"
                required
              />
            </label>

{/* --------- buttons login/register --------- */}

            <div>
              <button type="submit"
                className={css.login__wrapper_form_input}>
                Вход
              </button>

              <button
                type="button"  className={css.login__wrapper_form_register}
              >
                Регистрация
              </button>
            </div>
         </form>
        </div>;
       </div>
};

export default Login;
