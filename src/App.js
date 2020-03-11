import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
  Route
} from 'react-router-dom';
import DashBoardComponent from './Components/Dashboard/DashBoardComponent';
import LoginComponent from './Components/Login/LoginComponent';
import { Authorization } from './utility/Authorization';
import PrivateRouter from './routers/PrivateRouter';
import PublicRouter from './routers/PublicRouter';
import NotFoundComponent from './Components/NotFound/NotFoundComponent';
import EmployeesComponent from './Components/Employees/EmployeesComponent';
import ProfileComponent from './Components/Profile/ProfileComponent';

function App() {
  Authorization();
  return (
    <Router>
      <ul>
        <li>
          <Link to='/'>Login</Link>
        </li>
        <li>
          <Link to='/login'>Logout</Link>
        </li>
      </ul>
      <Switch>
        <PublicRouter path='/' exact Component={LoginComponent} />
        <PublicRouter path='/login' Component={LoginComponent} />
        <PrivateRouter path='/dashboard' Component={DashBoardComponent} />
        <PrivateRouter path='/employees' Component={EmployeesComponent} />
        <PrivateRouter path='/profile' Component={ProfileComponent} />

        <Route path='**' exact>
          <NotFoundComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
