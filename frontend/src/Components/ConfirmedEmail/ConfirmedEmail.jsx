import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = ({ location, history, match }) => {
  const [isVerified, setIsVerified] = useState(null);

  axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

  useEffect(() => {
    const path = location.pathname;

    setIsVerified(path.length > 14);
  }, [location.pathname]);

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  }, [history, isVerified]);

  const request = async () => {
    if (isVerified) {
      try {
        const result = await axios.get(`/auth/verify/${match.params.token}`);
        result.status === 200 && setIsVerified(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    request();
  }, []);

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
