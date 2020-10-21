import React from 'react';
import classNames from 'classnames';
import css from './Navigation.module.css';

const Navigation = () => {
    return (
        <div className={css.main__buttons_wrapper}>
            <button
                className={classNames(css.main__btn, css.main__btn_home)}
            ></button>
            <button
                className={classNames(css.main__btn, css.main__btn_statistic)}
            ></button>
            <button
                className={classNames(css.main__btn, css.main__btn_course)}
            ></button>
        </div>
    );
};

export default Navigation;