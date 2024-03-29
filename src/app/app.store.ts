import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './app.reducer';


const configureStore = (preloadedState: any) =>
  createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));

export { configureStore };
