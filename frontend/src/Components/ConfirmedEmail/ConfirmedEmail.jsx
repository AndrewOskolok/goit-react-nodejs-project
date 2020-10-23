import React, { useEffect, useState } from "react";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = ({location}) => {
  const [isVerified, setIsVerified] = useState(null)

  useEffect(() => {
    const path = location.pathname

    setIsVerified(path.length > 14)
  }, [location.pathname])

  return (
    <div className={css.confirmed}>
      <div className={css.confirmed__wrapper}>
        <div className={css.confirmed__email_wrapper}>
          {!isVerified && <p className={css.confirmed__text}>Необходимо подтвердить ваш E-mail</p>}
          {isVerified && <p className={css.confirmed__text}>Ваш E-mail успешно подтверждён!</p>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedEmail;
