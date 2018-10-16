import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as fromTuning from './tuning.reducer';


export interface State {
  data: fromTuning.State,
}

export const reducer = (combineReducers as any)({
  data: fromTuning.reducer,
});


const getModuleState = (state: any) => state.tuning;

const getDataState = createSelector(getModuleState, (state: State) => state.data);
export const getNeck = createSelector(getDataState, fromTuning.getNeck);
export const getRoot = createSelector(getDataState, fromTuning.getRoot);
export const getMode = createSelector(getDataState, fromTuning.getMode);
export const getModeName = createSelector(getDataState, fromTuning.getModeName);
