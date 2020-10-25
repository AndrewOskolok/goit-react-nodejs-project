import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = ({ history, match }) => {
  const [isVerified, setIsVerified] = useState(null);

  axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

  useEffect(() => {
    match.params.token && setIsVerified(true);
  }, [match]);

  const request = async () => {
    console.log(match.params.token);
    try {
      const result = await axios.get(`/auth/verify/${match.params.token}`);

      console.log(result);

      result.status === 200 &&
        setTimeout(() => {
          history.push("/login");
        }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isVerified) {
      request();
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
