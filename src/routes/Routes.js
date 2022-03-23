/* eslint-disable react/prop-types */
import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login/login";
import { useAuth } from "../utils/Auth/use-auth";
import Home from "../components/Home/home";

const ProtectedRoute = (route) => {
  const auth = useAuth();
  return (
    <Route
      path={route.path}
      render={(props, location) => {
        if (auth.data && !auth.error && !auth.isLoading) {
          return <route.component {...props} />;
        } else if (
          (!auth.isLoading && !auth.data) ||
          (auth.error && !auth.isLoading)
        ) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            ></Redirect>
          );
        }
      }}
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <ProtectedRoute exact path={'/'} component={Home}/>
      <ProtectedRoute exact path={"/home"} component={Home} />
      <Route component={() => <h1>404 Not found</h1>} />
    </Switch>
  );
};

export default Routes;
