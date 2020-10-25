import React, { useEffect, useState } from "react";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = ({ location, history }) => {
  const [isVerified, setIsVerified] = useState(null);

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
