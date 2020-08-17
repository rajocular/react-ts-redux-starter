import { DEPOSIT, FETCH, SUCCESS, ERROR } from 'src/constants/action';
import { StoreAction } from 'src/interfaces';

export const deposit = (reducerName: string, data: object | any[]): StoreAction => ({
  type: DEPOSIT,
  name: reducerName,
  data
});

export const fetch = (reducerName: string): StoreAction => ({
  type: FETCH,
  name: reducerName
});

export const success = (reducerName: string): StoreAction => ({
  type: SUCCESS,
  name: reducerName
});

export const failure = (reducerName: string, error: object | any[]): StoreAction => ({
  type: ERROR,
  name: reducerName,
  error
});
