import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import classNames from 'classnames';
import css from './Navigation.module.css';

const Navigation = () => {
    return (
        <BrowserRouter>
            <nav className={css.main__buttons_wrapper}>
                <button className={classNames(css.main__btn, css.main__btn_home)}
                    ><Link to="/"></Link></button>
                    
                <button className={classNames(css.main__btn, css.main__btn_statistic)}
                    ><Link to="/statistic_page"></Link></button>
                
                <button className={classNames(css.main__btn, css.main__btn_course)}
                    ><Link to="/currency_page"></Link></button>
            </nav>
            
            <Switch>
                <Route exact path="/" />
                <Route path="/statistic_page" component={} />
                <Route path="/currency_page" component={}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Navigation;