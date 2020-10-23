import React from "react";
import css from "./ConfirmedEmail.module.css";

const ConfirmedEmail = () => {
  return (
    <div className={css.confirmed}>
      <div className={css.confirmed__wrapper}>
        <div onSubmit className={css.confirmed__email_wrapper}>
          <p className={css.confirmed__text}>E-mail подтверждён!</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedEmail;
