import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { logger } from 'redux-logger';

import * as reducers from 'src/constants/reducer';
import { reducerForNetwork, reducerForStorage } from './reducer';

const getReducer = (reducer: Function, type: string) => (
  state: object,
  action: { name: string }
) => (type !== action.name && state !== undefined) ? state : reducer(state, action);

const rootReducer = combineReducers({
  // Store reducers
  [reducers.STORE_AUTHENTICATION]: getReducer(reducerForStorage, reducers.STORE_AUTHENTICATION),

  // Network reducers
  [reducers.API_AUTHENTICATION]: getReducer(reducerForNetwork, reducers.API_AUTHENTICATION)
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    reducers.STORE_AUTHENTICATION
  ]
};

/**
 * Setup the store and add the middleware, thunk, etc...
 */
const configStore = () => {
  const reducerWithPersist = persistReducer(persistConfig, rootReducer);
  const middleware = (process.env.NODE_ENV === 'development-logger') ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

  return createStore(reducerWithPersist, middleware);
};

const store = configStore();
const persistor = persistStore(store as any);

export { store, persistor };
