import { Dispatch } from 'redux';

import { fetch, success, failure, deposit } from 'src/store/action';
import * as reducers from 'src/constants/reducer';

export const login = () => async (dispatch: Dispatch): Promise<void> => {
  const { STORE_AUTHENTICATION, API_AUTHENTICATION } = reducers;

  dispatch(fetch(API_AUTHENTICATION));

  try {
    const authData = {
      isAuthenticated: true
    };
    dispatch(success(API_AUTHENTICATION));
    dispatch(deposit(STORE_AUTHENTICATION, authData));
  } catch (error) {
    dispatch(failure(API_AUTHENTICATION, error));
    return Promise.reject(error);
  }

};

export const logout = () => (dispatch: Dispatch) => {
  const { STORE_AUTHENTICATION } = reducers;
  const authData = {
    isAuthenticated: false
  };
  dispatch(deposit(STORE_AUTHENTICATION, authData));
};
