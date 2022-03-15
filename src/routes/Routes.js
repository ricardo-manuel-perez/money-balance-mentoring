import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from '../components/Login/login';
import { useAuth } from '../utils/Auth/use-auth';
import Home from '../components/Home/home';

const Routes = () => {
  const auth = useAuth();
  const userLoggedIn = auth.user;
  return (
    <Router>
      <Switch>
        <Route
          path={ '/login' }
          exact={ true }
          render={ () => userLoggedIn ? <Redirect to={ { pathname: '/home' } }/> : <Login /> }
        />
        <Route
          path={ '/home' }
          exact={ true }
          render={ () => userLoggedIn ? <Home/> : <Redirect to={ { pathname: '/login' } }/> }
        />
        <Route
          path={ '/' }
          exact={ true }
          render={ () => userLoggedIn ? <Home/>  : <Redirect to={ { pathname: '/login' } }/> }
        />
        <Route
          path={ '*' }
          exact={ true }
          render={ () => userLoggedIn ? <Home/>  : <Redirect to={ { pathname: '/login' } }/> }
        />
      </Switch>
    </Router>
  )
};

export default Routes;
