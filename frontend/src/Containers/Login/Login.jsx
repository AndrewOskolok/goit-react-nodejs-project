import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../../redux/opertions/userOperation";
import { errorOff } from "../../redux/actions/errorAction";
import css from "./Login.module.css";
import { getErrorMessage } from "../../redux/selectors/selectors";
import { useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [errorEmailLength, setErrorEmailLength] = useState(false);
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);

  const errorMessageLogin = useSelector(state => getErrorMessage(state))

  const dispatch = useDispatch();

  useEffect(()=> {
    errorMessageLogin && dispatch(errorOff())
  
  },[dispatch]) 

  const handleFormInput = ({ target }) => {
    const { name, value } = target;
    setForm((state) => ({ ...state, [name]: value }));

    errorMessageLogin && dispatch(errorOff())
  };

  const validate = async (e) => {
    e.preventDefault();
    const errors = {};

    //====================================email==================================//

    if (form.email.length === 0) {
      setErrorEmailLength(true);
      errors.emailLength = true;
    } else {
      setErrorEmailLength(false);
      errors.emailLength = false;
    }

    //=====================================password===========================//

    if (form.password.length < 6) {
      setErrorPasswordLength(true);
      errors.passwordLength = true;
    } else {
      setErrorPasswordLength(false);
      errors.passwordLength = false;
    }

    const arr = Object.values(errors);
    if (!arr.find((error) => error === true)) {
      dispatch(loginHandler({ email, password }));
    }
  
  };

  const { email, password } = form;

  return (
    <div className={css.login}>
      <div className={css.login__wrapper}>
        <form onSubmit={validate} className={css.login__form_wrapper}>
          <p className={css.login__logo}>Wallet</p>

          {/* --------- email input --------- */}

          <div className={css.login__button_data}>
            <label className={css.login__email_icon}>
              <input
                className={css.login__email}
                placeholder="E-mail"
                name="email"
                value={email}
                onChange={handleFormInput}
                autoFocus
              />
            </label>

            {errorEmailLength && (
              <p className={css.login__errorEmailLength_p}>
                *Введите ваш Email
              </p>
            )}

            {errorMessageLogin && <p className={css.login__errorMessageLogin}>{errorMessageLogin}</p>}

            {/* --------- password input --------- */}

            <label className={css.login__password_icon}>
              <input
                className={css.login__password}
                placeholder="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={handleFormInput}
                minLength="6"
              />
            </label>
          </div>

          {errorPasswordLength && (
            <p className={css.login__errorPasswordLength_p}>*Введите ваш пароль</p>
          )}

          {/* --------- buttons login/register --------- */}

          <div className={css.login__button}>
            <button type="submit" className={css.login__submit_btn}>
              Вход
            </button>

            <Link to="/registration" className={css.login__registration_btn}>
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
