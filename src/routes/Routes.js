/* eslint-disable react/prop-types */
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

/*const ProtectedRoute = ({ route, auth }) => {
  return (
    <Route path={route.path} render={(props, location) => {
      if (auth.data && !auth.error && !auth.isLoading) {
        return <route.component {...props} />
      } else if (!auth.isLoading && !auth.data || (auth.error && !auth.isLoading)) {
        return <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}></Redirect>
      }
    }} />
  )
}*/

const isUserLoggedIn = (auth) => {
  if (auth.data && !auth.error && !auth.isLoading) {
    return true;
  } else if (!auth.isLoading && !auth.data || (auth.error && !auth.isLoading)) {
    return false;
  }
}

const Routes = () => {
  // auth = {isLoading, error, data:{user}}
  const auth = useAuth();
  return (
    <Router>
      <Switch>
        <Route
          path={'/login'}
          exact={true}
          render={() => isUserLoggedIn(auth) ? <Redirect to={{ pathname: '/home' }} /> : <Login />}
        />
        <Route
          path={'/home'}
          auth={auth}
          render={() => isUserLoggedIn(auth) ? <Home /> : <Redirect to={{ pathname: '/login' }} />}
        />
        <Route
          path={'/'}
          exact={true}
          render={() =>isUserLoggedIn(auth) ? <Home /> : <Redirect to={{ pathname: '/login' }} />}
        />
        <Route component={() => (<h1>404 Not found</h1>)}/>
      </Switch>
    </Router>
  )
};

export default Routes;
