import { lensProp, set, slice } from 'ramda';
import { createSelector } from 'reselect';

import { createReducer, initializeIds, intializeEntities } from '../../../helpers/redux-utilities';

import * as actions from '../actions/tuning.actions';
import { Tuning, defaultTunings } from '../models/tuning.model';

const standardTuning = ['E', 'B', 'G', 'D', 'A', 'E', 'B'];

export interface TuningEntities { [id: number]: Tuning };

export interface State {
  ids: number[],  
  entities: TuningEntities,
  selectedId: number | null,
  custom: Tuning,
};

export const initialState: State = {
  ids: initializeIds(defaultTunings),
  entities: intializeEntities(defaultTunings),
  selectedId: 0,
  custom: {
    id: 0,
    label: 'custom',
    value: ['E', 'B', 'G', 'D', 'A', 'E'],
  },
};


export const reducer = createReducer(initialState, {
  [actions.SELECT]: set(lensProp('selectedId')),
  [actions.TUNE_STRING]: ({ stringNum, pitch }: { stringNum: number, pitch: string }) => (state) => {
    return {
      ...state,
      selectedId: 0,
      custom: {
        ...state.custom,
        value: Object.assign([], state.custom.value, { [stringNum]: pitch }),
      },
    };
  },
  [actions.SET_STRINGS]: (payload: number) => (state) => {
    let value;
    if (payload < state.custom.value.length) {
      value = slice(0, payload - state.custom.value.length, state.custom.value);
    }
    else if (payload > state.custom.value.length) {
      value = [];
      for (let i = 0; i < payload; i++) {
        if (!state.custom.value[i]) {
          value.push(standardTuning[i]);
        } else {
          value.push(state.custom.value[i]);
        }
      }
    }

    return {
      ...state,
      selectedId: 0,
      custom: {
        ...state.custom,
        value,
      },
    };
  },
});


// Selector Functions
// --------------------------------------------------

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;
export const getCustom = (state: State) => state.custom;

export const getSelectedEntity = createSelector(
  getEntities,
  getSelectedId,
  getCustom,
  (entities, selectedId, custom) => {
    return selectedId === 0 ? custom : entities[selectedId];
  }
);

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