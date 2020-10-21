import React from "react";
import { useState } from "react";
import css from "./Login.module.css";
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  password: ''
}

// console.log('object :>> ', initialState);

const Login = ({location}) => {
  const [form, setForm] = useState(initialState);

  const handleFormInput =({target}) => {
  const {name, value} = target
  setForm(state => ({...state, [name]: value }))
  }


  const {email, password} = form

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
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleFormInput}
                  required
                  autoFocus
                />
              </label>

{/* --------- password input --------- */}

              <label className={css.login__password_icon}>
                <input
                  className={css.login__password}
                  placeholder="Пароль"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleFormInput}
                  minLength="4"
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

              <Link to='/registration' className={css.login__registration_btn}>
                Регистрация
              </Link>
            </div>
         </form>
        </div>
       </div>
};

export default Login;
