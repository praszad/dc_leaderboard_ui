import React from 'react';
import { Router, Switch, Redirect, Link, Route } from 'react-router-dom';
import history from '../src/utility/history';
import DashBoardComponent from './Components/Dashboard/DashBoardComponent';
import LoginComponent from './Components/Login/LoginComponent';
import { Authorization } from './utility/Authorization';
import PrivateRouter from './routers/PrivateRouter';
import PublicRouter from './routers/PublicRouter';
import NotFoundComponent from './Components/NotFound/NotFoundComponent';
import ProfileComponent from './Components/Profile/ProfileComponent';
import SignupComponent from './Components/Signup/SignupComponent';

function App() {
  Authorization();
  return (
    <Router history={history}>
      <Switch>
        <PublicRouter path='/' exact Component={LoginComponent} />
        <PublicRouter path='/login' Component={LoginComponent} />
        <PrivateRouter path='/dashboard' Component={DashBoardComponent} />
        <PrivateRouter path='/employees' Component={DashBoardComponent} />
        <PrivateRouter path='/adduser' Component={SignupComponent} />
        <PrivateRouter path='/profile' Component={ProfileComponent} />

        <Route path='**' exact>
          <NotFoundComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
