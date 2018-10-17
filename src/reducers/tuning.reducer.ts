import { lensProp, set } from 'ramda';
import { createSelector } from 'reselect';

import { calcFrettedAllNotes, parseNotesFromFormula } from '../helpers/music-theory';
import { createReducer } from '../helpers/redux-utilities';

import * as actions from '../actions/tuning.actions';


export interface State {
  tune: string[],
  root: string,
  mode: number[],
  modeName: string,
};

const defaultTuning = ['E', 'B', 'G', 'D', 'A', 'E'];
export const initialState: State = {
  tune: defaultTuning,
  root: null,
  mode: null,
  modeName: null,
};


const setMode = (payload: { name: string, data: number[] }) => {
  return (state: State): State => ({
    ...state,
    mode: payload.data,
    modeName: payload.name,
  });
}


export const reducer = createReducer(initialState, {
  [actions.SELECT_ROOT]: set(lensProp('root')),
  [actions.SET_MODE]: setMode,
  [actions.TUNE]: set(lensProp('tune')),
});


export const getTune = (state: State) => state.tune;
export const getRoot = (state: State) => state.root;
export const getMode = (state: State) => state.mode;
export const getModeName = (state: State) => state.modeName;

export const getNeck = createSelector(
  getTune,
  getRoot,
  getMode,
  (tuning: string[], root: string, mode: number[]): string[][] => {
    const neck = calcFrettedAllNotes(tuning);

    if (root === null) {
      return neck;
    }

    const selectedNotes = !!mode ? parseNotesFromFormula(root, mode) : [root];

    return neck.map((fret) => {
      return fret.map(slink => selectedNotes.includes(slink) ? slink : null);
    });
  },
);
