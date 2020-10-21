import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Containers/Login/Login';
import Registration from '../Containers/Registration/Registration';
import Main from '../Containers/Main/Main';
import Statistic from '../Containers/Statistic/Statistic';
import css from './App.module.css';

function App() {
  // This state for convenient development of your components
  // Set whether the user is authorized
  // In the future, the routing system will change
  const [authorise] = useState(true);

  return (
    <div className={css.app}>   
      <Switch>
        {!authorise && <Route path="/login" component={Login} />}
        {!authorise && <Route path="/registration" component={Registration} />}
        {!authorise && <Redirect to="/login" />}

        {authorise && <Route path="/" exact component={Main} />}
        {authorise && <Route path="/statistic" component={Statistic} />}
        {authorise && <Redirect to="/" />}
      </Switch>
    </div>
  );
}

export default App;
