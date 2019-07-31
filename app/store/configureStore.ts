import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from '@reducers/index'; // where reducers is a object of reducers

const config = {
  key: 'root',
  storage,
  blacklist: ['loadingReducer'],
  debug: true, // to get useful logging
};

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducer);

const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, undefined, () => {
  console.log('Test', store.getState());
});
const configureStore = () => {
  return { persistor, store };
};

export default configureStore;
