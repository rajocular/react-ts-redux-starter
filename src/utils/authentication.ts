import { store } from 'src/store';

export const isAuthenticated = () => {
  const state = store.getState();
  const authentication = state.STORE_AUTHENTICATION;

  return authentication.data?.isAuthenticated;
};

export const authHeader = () => {
  const state = store.getState();
  // TODO: Remove hardcoded token
  const token = state.STORE_AUTHENTICATION.data?.token;

  return {
    headers: {
      'Authorization': `Token token=${token}`,
      'content-type': 'application/json',
      'x-csrf-token': 1
    }
  };
};
