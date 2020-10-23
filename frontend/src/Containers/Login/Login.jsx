import React from "react";
import { useState } from "react";
import css from "./Login.module.css";
import { Link } from 'react-router-dom';
import { loginHandler } from '../../redux/opertions/userOperation'
import { useDispatch } from 'react-redux';

const initialState = {
  email: '',
  password: ''
}

const Login = ({location}) => {
  const [form, setForm] = useState(initialState);
  const [errorEmailLength, setErrorEmailLength] = useState(false)
  const [errorEmailValidate, setErrorEmailValidate] = useState(false)
  const [errorPasswordLength, setErrorPasswordLength] = useState(false)
  const [errorPasswordValidate, setErrorPasswordValidate] = useState(false)

  const dispatch = useDispatch();

  const handleFormInput =({target}) => {
  const {name, value} = target
  setForm(state => ({...state, [name]: value }))
  }

  const validate = async(e) => {  
  e.preventDefault();
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const errors = {}

  //====================================email==================================//

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

  //=====================================password===========================//

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

      const arr = Object.values(errors)
      if (!arr.find(error => error === true)) {
        dispatch(loginHandler({email, password}))
      }
    
  }

const {email, password} = form

return <div className={css.login}>   
        <div className={css.login__wrapper}>
          <form onSubmit={validate}
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

              {errorEmailLength &&<p className={css.login__errorEmailLength_p}>email</p>}
              {errorEmailValidate &&<p className={css.login__errorEmailValidate_p}>email111</p>}

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
                  required
                />
              </label>
            </div>

            {errorPasswordLength &&<p className={css.login__errorPasswordLength_p}>password</p>}
            {errorPasswordValidate &&<p className={css.login__errorPasswordValidate_p}>password111</p>}

{/* --------- buttons login/register --------- */}

            <div className={css.login__button}>
              <button type='submit'
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
