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
import Transactions from "../components/Transactions/transactions";
import NotFound from "../components/NotFound/notFound";
import { getAccountsQuery } from "../services/Account/account";
import { UseGetEntity } from "../services/Entity/entity";
import { useHistory } from "react-router-dom";

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
  const auth = useAuth();
  const user = auth?.data;
  const accountsQuery = user?.uid && getAccountsQuery(user.uid);
  const accountsStateParam = accountsQuery ? UseGetEntity(accountsQuery) : [];
  let history = useHistory();
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <ProtectedRoute exact path={'/'} component={() => <Home { ...{accountsStateParam, history} }/>}/>
      <ProtectedRoute exact path={"/home"} component={() => <Home { ...{accountsStateParam, history} }/>} />
      <ProtectedRoute exact path={"/accounts"} component={() => <Home { ...{accountsStateParam, history} }/>} />
      <ProtectedRoute exact path={"/accounts/:accountId/transactions"} component={Transactions} />
      <Route component={() => <NotFound></NotFound>} />
    </Switch>
  );
};

export default Routes;
