import { lensProp, set } from 'ramda';
import { createSelector } from 'reselect';

import { createReducer, initializeIds, intializeEntities } from '../../../helpers/redux-utilities';

import * as actions from '../actions/scale.actions';
import { Scale, defaultScales } from '../models/scale.model';


export interface ScaleEntities { [id: number]: Scale };

export interface State {
  ids: number[],  
  entities: ScaleEntities,
  selectedId: number | null,
};

export const initialState: State = {
  ids: initializeIds(defaultScales),
  entities: intializeEntities(defaultScales),
  selectedId: 1,
};


export const reducer = createReducer(initialState, {
  [actions.SELECT]: set(lensProp('selectedId')),
});


// Selector Functions
// --------------------------------------------------

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getSelectedEntity = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getItems = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
