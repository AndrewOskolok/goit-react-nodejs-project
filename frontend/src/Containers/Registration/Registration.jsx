import React from "react";
import { useState, useEffect } from "react";
import css from "./Registration.module.css";

const Registration = () => {
 
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
          // onClick={handleTypeRegister}
        >
          Вход
        </button>
      </div>
   </form>
  </div>
 </div>
};
export default Registration;
