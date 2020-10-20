import React from "react";
import css from "./Login.module.css";
import { Link, useLocation } from 'react-router-dom';

const Login = () => {

  const location = useLocation();

return <div className={css.login}>   
        <div className={css.login__wrapper}>
          <form onSubmit
            className={css.login__form_wrapper}>
            <p className={css.login__logo}>
               Wallet
            </p>

{/* --------- email input --------- */}

            <div className={css.login__button_data}>
              <label className={css.login__email_icon}>
                <input
                  className={css.login__email}
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

              <label className={css.login__password_icon}>
                <input
                  className={css.login__password}
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
            </div>

{/* --------- buttons login/register --------- */}

            <div className={css.login__button}>
              <button type="submit"
                className={css.login__submit_btn}>
                Вход
              </button>

              <Link
              to={{
                pathname: '/registration',
                state: { from: location },
              }}>
              <button
                type="button"  className={css.login__registration_btn}
                >
                Регистрация
              </button>
               </Link>
            </div>
         </form>
        </div>
       </div>
};

export default Login;
