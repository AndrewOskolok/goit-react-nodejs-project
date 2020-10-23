import React, { useEffect } from "react";
import { useState } from "react";
import css from "./Registration.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerHandler } from '../../redux/opertions/userOperation'
import  {getUserState}  from '../../redux/selectors/selectors'
import { getUser } from "../../redux/actions/userAction";

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: ''
}

const Registration = ({history}) => {
  const [form, setForm] = useState(initialState);
  const [reliability, setReliability] = useState(null)
  const [onVerification, setOnVerification]= useState(false)
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

  useEffect(()=> {
    dispatch(getUser(null))
  }, [])

  useEffect(() => {
    const reliability = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (form.password.length === 0) {
      setReliability(null)
    } else if ((form.password.length > 0 && form.password.length < 6) || !reliability.test(form.password)) {
      setReliability(1)
    } else if (form.password.length >= 6 && form.password.length <= 12 && reliability.test(form.password)) {
      setReliability(2)
    }
      else if (form.password.length >= 12 && reliability.test(form.password)) {
      setReliability(3)
    }
  }, [form])

  const validate = async(e) => {
    //=====================================email=================================//
    e.preventDefault();
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const errors = {}
    if (form.email.length === 0) {
      setErrorEmailLength(true);
      errors.emailLength = true;
      setErrorEmailValidate(false);
      errors.emailValidateLength = false;
    }

      else {
      setErrorEmailLength(false);
      errors.emailLength = false;
          if (!re.test(form.email)) {
          setErrorEmailValidate(true);
          errors.emailValidateLength = true;
          }
      }

    //=====================================password===============================//

    if (form.password.length < 6) {
      setErrorPasswordLength(true)
      errors.passwordLength = true;
      setErrorPasswordValidate(false)
      errors.passwordValidate = false;
    }

      else {
      setErrorPasswordLength(false);
      errors.passwordLength = false;
      if (!passw.test(form.password)) {
        setErrorPasswordValidate(true)
        errors.passwordValidate = true;
        }
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
      setOnVerification(true)

    }
  }
  
  if (onVerification && userStatus === "onVerification") {
    setTimeout(() => {
      history.push('/verification')
    }, 500);
  }
  
  const {email, password, passwordConfirm, firstName} = form
 
  return <div className={css.registration}>   
  <div className={css.registration__wrapper}>
    <form 
    onSubmit={validate}
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
            // type="email" 
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={handleFormInput}
            // required
            autoFocus
          />
        </label>

        {errorEmailLength &&<p className={css.registration__errorEmailLength_p}>*Введите ваш Email</p>}
        {errorEmailValidate &&<p className={css.registration__errorEmailValidate_p}>*Некорректный Email</p>}

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
            // required
          />
        </label>

        {errorPasswordLength &&<p className={css.registration__errorPasswordLength_p}>*Введите ваш пароль</p>}
        {errorPasswordValidate &&<p className={css.registration__errorPasswordValidate_p}>*Пароль должен содержать цифру и большую букву</p>}
      
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
            minLength="6"
            maxLength="20"
            // required
          />
        </label>

         { password !== passwordConfirm && <p className={css.registration__password_reliability_text}>*Пароль не совпадает</p>}


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
            maxLength="11"
            // required
          />
        </label>

        {errorFirstNameLength &&<p className={css.registration__errorFirstNameLength_p}>*Введите имя</p>}

      </div>

{/* ----------------------- buttons login/register ------------------------ */}

      <div className={css.registration__button}>
        <button
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
