import React, { useEffect } from "react";
import { useState } from "react";
import css from "./Registration.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerHandler } from '../../redux/opertions/userOperation'
import  getUserState  from '../../redux/selectors/selectors'

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: ''
}

const Registration = ({location}) => {
  const [form, setForm] = useState(initialState);
  const [reliability, setReliability] = useState(null)
  const [errorEmailLength, setErrorEmailLength] = useState(false)
  const [errorEmailValidate, setErrorEmailValidate] = useState(false)
  const [errorPasswordLength, setErrorPasswordLength] = useState(false)
  const [errorPasswordValidate, setErrorPasswordValidate] = useState(false)
  const [errorFirstNameLength, setErrorFirstNameLength] = useState(false)

  const dispatch = useDispatch();

  const handleFormInput = ({target}) => {
  const {name, value} = target
  setForm(state => ({...state, [name]: value }))
  }

  const userStatus = useSelector((state) => getUserState(state));
  console.log('userStatus :>> ', userStatus);

  useEffect(() => {
    if (form.password.length === 0) {
      setReliability(null)
    } else if (form.password.length > 0 && form.password.length < 8) {
      setReliability(1)
    } else if (form.password.length >= 8) {
      setReliability(2)
    }
      // else if (form.password.length >= 8) {
      //   for (let i = 0; i < form.password.length; i++) {
      //     if (form.password.length === !Number) {
      //       console.log('111 :>> ');
      //     }
      //   }
      
      // setReliability(3)
    // }
    // else if (form.password.length >= 8 &) {
    //   setForm(2)
    // }
  }, [form])

  const validate = async(e) => {
    //=====================================email=================================//
    e.preventDefault();
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const errors = {}
    if (form.email.length === 0) {
      setErrorEmailLength(true)
      errors.emailLength = true;
    }

      else {
      setErrorEmailLength(false);
      errors.emailLength = false;
     }

    if (!re.test(form.email)) {
      setErrorEmailValidate(true)
      errors.emailValidateLength = true;
    }

      else {
      setErrorEmailValidate(false);
      errors.emailValidateLength = false;
     }

    //=====================================password===============================//

    if (form.password.length < 6) {
      setErrorPasswordLength(true)
      errors.passwordLength = true;
    }

      else {
      setErrorPasswordLength(false);
      errors.passwordLength = false;
      }

    if (!passw.test(form.password)) {
      setErrorPasswordValidate(true)
      errors.passwordValidate = true;
    }

      else{
      setErrorPasswordValidate(false)
      errors.passwordValidate = false;
      }
  
    //=====================================name======================================//

      if (firstName.length < 2) {
      setErrorFirstNameLength(true)
      errors.firstNameLength = true;
    }

    else {
      setErrorFirstNameLength(false);
      errors.firstNameLength = false;
      }

    const arr = Object.values(errors)
    if (!arr.find(error => error === true)) {
      dispatch(registerHandler({email, password,username: firstName}))
    }
  }


  const {email, password, passwordConfirm, firstName} = form
  
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
            onChange={handleFormInput}
            required
            autoFocus
          />
        </label>

        {errorEmailLength &&<p className={css.registration__errorEmailLength_p}>email</p>}
        {errorEmailValidate &&<p className={css.registration__errorEmailValidate_p}>email111</p>}

{/* ------------------------ password input ------------------------*/}

        <label className={css.registration__password_icon}>
          <input
            className={css.registration__password}
            placeholder="Пароль"
            type="password"
            name="password"
            value={password}
            onChange={handleFormInput}
            minLength="6"
            maxLength="20"
            required
          />
        </label>

        {errorPasswordLength &&<p className={css.registration__errorPasswordLength_p}>password</p>}
        {errorPasswordValidate &&<p className={css.registration__errorPasswordValidate_p}>password111</p>}
      
{/* ------------------------ password confirm status------------------------*/}

       {reliability && <div className={css.registration__password_reliability}>
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

         { password !== passwordConfirm && <p className={css.registration__password_reliability_text}>* Пароль не совпадает</p>}


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
            // minLength="2"
            // maxLength="20"
            required
          />
        </label>

        {errorFirstNameLength &&<p className={css.registration__errorFirstNameLength_p}>name</p>}

      </div>

{/* ----------------------- buttons login/register ------------------------ */}

      <div className={css.registration__button}>
        <button onClick={validate}
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
