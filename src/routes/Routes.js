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

const ProtectedRoute = ({ route, auth }) => {
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
          render={Login}
        />
        <ProtectedRoute
          path={'/home'}
          auth={auth}
          render={Home}
        />
        <Route
          path={'/'}
          exact={true}
          render={() => auth.data ? <Home /> : <Redirect to={{ pathname: '/login' }} />}
        />
        <Route component={() => (<h1>404 Not found</h1>)}/>
      </Switch>
    </Router>
  )
};

export default Routes;
