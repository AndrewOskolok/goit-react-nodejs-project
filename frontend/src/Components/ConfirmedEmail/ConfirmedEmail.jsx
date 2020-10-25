import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = ({ history, match }) => {
  const [isVerified, setIsVerified] = useState(null);

  axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

  useEffect(() => {
    match.params.token && setIsVerified(true);
  }, [match]);

  useEffect(() => {
    if (isVerified) {
      try {
        axios.get(`/auth/verify/${match.params.token}`);

        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div className={css.confirmed}>
      <div className={css.confirmed__wrapper}>
        <div className={css.confirmed__email_wrapper}>
          {!isVerified && (
            <p className={css.confirmed__text}>
              Необходимо подтвердить вашу почту
            </p>
          )}
          {isVerified && (
            <p className={css.confirmed__text}>
              Ваша почта успешно подтверждена!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedEmail;
