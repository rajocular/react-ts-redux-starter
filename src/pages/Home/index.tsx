import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Box } from '@material-ui/core';

import { logout } from 'src/thunks/auth-thunks';
import { RouteComponentProps } from 'react-router-dom';
import { LOGIN } from 'src/constants/routes';
import Layout from 'src/components/common/layout';

interface HomeProps {
  logout: Function;
}

const Home: React.FC<RouteComponentProps & HomeProps> = ({ history, logout }) => {
  const handleLogout = async () => {
    await logout();
    history.push(LOGIN);
  };

  return (
    <Layout>
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant='h4'>Hello world!</Typography>
        <Button onClick={handleLogout} variant='outlined' color='secondary'>Logout</Button>
      </Box>
    </Layout>
  );
};

const mapDispatchToProps = {
  logout
};

export default connect(null, mapDispatchToProps)(Home);
