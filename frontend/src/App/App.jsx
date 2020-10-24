import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { getUserState } from "../redux/selectors/selectors";
import Login from "../Containers/Login/Login";
import ConfirmedEmail from "../Components/ConfirmedEmail/ConfirmedEmail";
import Registration from "../Containers/Registration/Registration.jsx";
import Main from "../Containers/Main/Main";
import css from "./App.module.css";

function App() {
  const authorise = useSelector((state) => getUserState(state));

  return (
    <div className={css.app}>
      <Switch>
        {!authorise && (
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/verification" component={ConfirmedEmail} />
            <Route
              exact
              path="/verification/:token"
              component={ConfirmedEmail}
            />
            <Redirect to="/login" />
          </Switch>
        )}

        {authorise && (
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/statistic" component={Main} />
            <Route exact path="/currency" component={Main} />
            <Redirect to="/" />
          </Switch>
        )}
      </Switch>
    </div>
  );
}

export default App;
