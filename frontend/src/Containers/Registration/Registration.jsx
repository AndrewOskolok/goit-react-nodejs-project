import React, { useEffect } from "react";
import { useState } from "react";
import css from "./Registration.module.css";
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: ''
}

// console.log('initialState :>> ', initialState);

const Registration = ({location}) => {
  const [form, setForm] = useState(initialState);
  const [reliability, setReliability] = useState(null)

  const handleFormInput = ({target}) => {
  const {name, value} = target
  setForm(state => ({...state, [name]: value }))
  }

  useEffect(() => {
    if (form.password.length === 0) {
      setReliability(null)
    } else if (form.password.length > 0 && form.password.length < 8) {
      setReliability(1)
    } else if (form.password.length >= 8) {
      setReliability(2)
    }
    // else if (form.password.length >= 8 &) {
    //   setForm(2)
    // }
  }, [form])

  const {email, password, passwordConfirm, firstName} = form
  console.log('form :>> ', form);
  
  // const [typeRegister, setTypeRegister] = useState(false);

  // const dispatch = useDispatch();

  // const handleTypeRegister = () => {
  //   setTypeRegister(currentState => {
  //     if (currentState) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  // };

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
    <form action="" method="POST"
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
            onChange={handleFormInput}
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
            type="password"
            name="password"
            value={password}
            onChange={handleFormInput}
            minLength="8"
            maxLength="20"
            required
          />
        </label>
      

{/* ------------------------ password confirm status------------------------*/}

       {reliability && <div>
        {reliability === 1 && <div className={css.registration__password_reliability_1}></div>}
        {reliability === 2 && <div className={css.registration__password_reliability_2}></div>}
        {reliability === 3 && <div className={css.registration__password_reliability_3}></div>}
        </div>}

{/* ------------------------ password confirm input ------------------------ */}

        <label className={css.registration__password_icon}>
          <input
            className={css.registration__password_confirm}
            placeholder="Подтвердите пароль"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleFormInput}
            minLength="4"
            maxLength="20"
            required
          />
        </label>

         { password !== passwordConfirm && <p>Пароль не совпадает</p>}


 {/* ----------------------- name user input ------------------------------        */}

        <label className={css.registration__avatar_icon}>
          <input
            className={css.registration__name_input}
            placeholder="Ваше имя"
            id="name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFormInput}
            minLength="2"
            maxLength="20"
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

        <Link to='/login' className={css.registration__registration_btn}>
          Вход
        </Link>
      </div>
   </form>
  </div>
 </div>
};
export default Registration;
