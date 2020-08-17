import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as routes from 'src/constants/routes';

import { isAuthenticated } from 'src/utils/authentication';
import Login from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';

export const PublicRoute = ({ component: Component, ...rest }: any): JSX.Element => (
  <Route {...rest} render={(props): JSX.Element => (
    isAuthenticated()
      ? <Redirect to={{ pathname: routes.DASHBOARD, state: { from: props.location } }} />
      : <Component {...props} />
  )} />
);

export const PrivateRoute = ({ component: Component, ...rest }: any): JSX.Element => (
  <Route {...rest} render={(props): JSX.Element => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
  )} />
);

export const RedirectRoute = ({ redirectPath, ...rest }: any): JSX.Element => (
  <Route {...rest} render={(props): JSX.Element => (
    <Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />
  )} />
);

const Routes = () => (
  <Switch>
    <PublicRoute exact path={routes.LOGIN} component={Login} />
    <PrivateRoute path={routes.DASHBOARD} component={Dashboard} />
  </Switch>
);

export default Routes;
