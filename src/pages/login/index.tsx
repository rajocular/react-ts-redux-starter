import React,  { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

import TextField from 'src/components/common/fields/text-field';

import { login } from 'src/thunks/auth-thunks';
import { DASHBOARD } from 'src/constants/routes';
import { connect } from 'react-redux';
import { API_AUTHENTICATION } from 'src/constants/reducer';
import Layout from 'src/components/common/layout';

interface LoginProps {
  login: Function;
}

const Login: React.FC<RouteComponentProps<any, any, any> & LoginProps> = ({
  history,
  location,
  login
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const redirectPath = (location.state as any)?.from?.pathname;
    await login();
    history.push(redirectPath || DASHBOARD);
  };

  return (
    <Layout>
      <Box component={'form'} onSubmit={handleLogin} display='flex' justifyContent='center' flexDirection='column' minWidth={250} maxWidth={300}>
        <TextField
          label='Username'
          fieldName='username'
          value={username}
          handleChange={(_name: string, value: string) => setUsername(value)}
          isRequired
        />
        <TextField
          type='password'
          label='Password'
          fieldName='password'
          value={password}
          handleChange={(_name: string, value: string) => setPassword(value)}
          isRequired
        />
        <Box mt={2} display='flex' alignItems='center' justifyContent='center'>
          <Button variant='outlined' onClick={handleLogin} color='primary'>
            Login
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  loginRequest: state[API_AUTHENTICATION]
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
