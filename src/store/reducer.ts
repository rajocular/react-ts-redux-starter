import { StoreAction } from 'src/interfaces';
import { Storage, Network } from 'src/interfaces';
import { DEPOSIT, FETCH, SUCCESS, ERROR } from '../constants/action';

 const initialStorageState: Storage = {
   data: []
 };

 const initialNetworkState: Network = {
   fetching: true,
   success: false,
   error: undefined,
   type: ''
 };

export const reducerForStorage = (state= initialStorageState, action: StoreAction): Storage => {
  switch (action.type) {
    case DEPOSIT: return { data: action.data };
    default: return state;
  }
};

export const reducerForNetwork = (state= initialNetworkState, action: StoreAction): Network => {
  switch (action.type) {
    case FETCH: return { fetching: true, success: false, error: null, type: action.type };
    case SUCCESS: return { fetching: false, success: true, error: null, type: action.type };
    case ERROR: return { fetching: false, success: false, error: action.error, type: action.type };
    default: return state;
  }
};
