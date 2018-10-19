import { combineReducers } from 'redux';

import * as fromMusic from '../modules/music/reducers';


const rootReducer = (combineReducers as any)({
  music: fromMusic.reducer,
});
  
export default rootReducer;
