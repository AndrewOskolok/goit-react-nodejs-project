import React from "react";
import { useState, useEffect } from "react";
import css from "./Registration.module.css";
import { useDispatch } from 'react-redux';

const Registration = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [typeRegister, setTypeRegister] = useState(false);

  const dispatch = useDispatch();

  const handleInputEmail = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleInputPassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleInputPasswordConfirm = e => {
    e.preventDefault();
    setPasswordConfirm(e.target.value);
  };

  const handleInputFirstName = e => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleTypeRegister = () => {
    setTypeRegister(currentState => {
      if (currentState) {
        return false;
      } else {
        return true;
      }
    });
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if (typeRegister) {
  //     const setRegParams = (email, password, passwordConfirm, firstName) => ({
  //         email: email,
  //         password: password,
  //         passwordConfirm: passwordConfirm,
  //         firstName: firstName
  //   });
  //     dispatch(register(setRegParams(email, password, passwordConfirm, firstName)));
  //   } else {
  //     const setLoginParams = (email, password) => ({
  //       email: email,
  //       password: password,
  //     });
  //     dispatch(login(setLoginParams(email, password)));
  //   }
  // };
 
  return <div className={css.registration}>   
  <div className={css.registration__wrapper}>
    <form
    // onSubmit={handleSubmit}
      className={css.registration__form_wrapper}>
      <p className={css.registration__logo}>
         Wallet
      </p>

{/* ------------------------ email input ------------------------ */}

      <div className={css.registration__button_data}>
        <label className={css.registration__email_icon}>
          <input
            className={css.registration__email}
            id="email"
            type="email"
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={handleInputEmail}
            required
            autoFocus
          />
        </label>

{/* ------------------------ password input ------------------------*/}

        <label className={css.registration__password_icon}>
          <input
            className={css.registration__password}
            placeholder="Пароль"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleInputPassword}
            minLength="4"
            maxLength="15"
            required
          />
        </label>

{/* ------------------------ password confirm input ------------------------ */}

        <label className={css.registration__password_icon}>
          <input
            className={css.registration__password_confirm}
            placeholder="Подтвердите пароль"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            id="password"
            type="password"
            name="password"
            value={passwordConfirm}
            onChange={handleInputPasswordConfirm}
            minLength="4"
            maxLength="15"
            required
          />
        </label>

{/* ------------------------ password confirm status------------------------*/}

        <div className={css.registration__password_confirm_status}>
          <span></span>
        </div>

 {/* ----------------------- name user input ------------------------------        */}

        <label className={css.registration__avatar_icon}>
          <input
            className={css.registration__name_input}
            placeholder="Ваше имя"
            id="name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleInputFirstName}
            minLength="2"
            maxLength="15"
            required
          />
        </label>

      </div>

{/* ----------------------- buttons login/register ------------------------ */}

      <div className={css.registration__button}>
        <button type="submit"
          className={css.registration__submit_btn}>
          Регистрация
        </button>

        <button
          type="button"  className={css.registration__registration_btn}
          onClick={handleTypeRegister}
        >
          Вход
        </button>
      </div>
   </form>
  </div>
 </div>
};
export default Registration;
