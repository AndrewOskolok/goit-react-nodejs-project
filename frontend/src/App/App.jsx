import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Containers/Login/Login";
import ConfirmedEmail from "../Components/ConfirmedEmail/ConfirmedEmail";
import Registration from "../Containers/Registration/Registration.jsx";
import Main from "../Containers/Main/Main";
import { getUserState } from "../redux/selectors/selectors";
import css from "./App.module.css";

function App() {
  const authorise = useSelector((state) => getUserState(state));

  return (
    <div className={css.app}>
      <Switch>
        {!authorise && <Route path="/login" component={Login} />}
        {!authorise && <Route path="/registration" component={Registration} />}
        {!authorise && (
          <Route exact path="/verification" component={ConfirmedEmail} />
        )}
        {!authorise && (
          <Route
            exact
            path="/verification/:verificationToken"
            component={ConfirmedEmail}
          />
        )}
        {!authorise && <Redirect to="/login" />}

        {authorise && <Route path="/" component={Main} />}
        {authorise && <Redirect to="/" />}
      </Switch>
    </div>
  );
}

export default App;
