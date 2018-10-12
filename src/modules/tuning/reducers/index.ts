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
export const getNeck = createSelector(getDataState, fromTuning.getFilteredNeck);
export const getSelectedNote = createSelector(getDataState, fromTuning.getSelectedNote);
