import React from 'react';
import { Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { RedirectRoute, PrivateRoute } from 'src/routes';
import * as routes from 'src/constants/routes';
import Home from '../Home';

const Dashboard: React.FC = () => (
  <Box height='100%'>
    <Switch>
      <RedirectRoute exact path={routes.DASHBOARD} redirectPath={routes.HOME} />
      <PrivateRoute path={routes.HOME} component={Home} />
    </Switch>
  </Box>
);

export default Dashboard;
