import { assoc } from 'ramda';
import { createSelector } from 'reselect';

import { createReducer, initializeIds, intializeEntities } from '../../../helpers/redux-utilities';

import * as actions from '../actions/tuning.actions';
import { Tuning, defaultTunings } from '../models/tuning.model';

export interface TuningEntities { [id: number]: Tuning };

export interface State {
  ids: number[],  
  entities: TuningEntities,
  tuning: string[],
};

export const initialState: State = {
  ids: initializeIds(defaultTunings),
  entities: intializeEntities(defaultTunings),
  tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
};


export const reducer = createReducer(initialState, {
  [actions.TUNE]: assoc('tuning'),
});


// Selector Functions
// --------------------------------------------------

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getTuning = (state: State) => state.tuning;

export const getItems = createSelector(getEntities, getIds, (entities, ids) => {
  return ids
    .map(id => entities[id])
    .sort((a: Tuning, b: Tuning) => {
      if (b.id === 1) { return 1; }
      if (a.label < b.label) { return -1; }
      if (a.label > b.label) { return 1; }
      return 0;
    });;
});