import { combineReducers } from 'redux';

import * as fromTuning from '../reducers';


const rootReducer = (combineReducers as any)({
  tuning: fromTuning.reducer,
});
  
export default rootReducer;
