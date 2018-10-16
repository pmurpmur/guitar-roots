import { lensProp, set } from 'ramda';
import { createSelector } from 'reselect';

import { calcFrettedAllNotes, parseNotesFromFormula } from '../helpers/music-theory';
import { createReducer } from '../helpers/redux-utilities';

import * as actions from '../actions/tuning.actions';


export interface State {
  tuning: string[],
  neck: string[][],
  root: string,
  mode: number[],
  modeName: string,
};

const defaultTuning = ['E', 'B', 'G', 'D', 'A', 'E'];
export const initialState: State = {
  tuning: defaultTuning,
  neck: calcFrettedAllNotes(defaultTuning),
  root: null,
  mode: null,
  modeName: null,
};


const tuneData = (payload: string[]) => {
  return (state: State): State => ({
    ...state,
    tuning: payload,
    neck: calcFrettedAllNotes(payload)
  });
}

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
  [actions.TUNE]: tuneData,
});


export const getTuning = (state: State) => state.tuning;
export const getNeck = (state: State) => state.neck;
export const getRoot = (state: State) => state.root;
export const getMode = (state: State) => state.mode;
export const getModeName = (state: State) => state.modeName;

export const getFilteredNeck = createSelector(
  getNeck,
  getRoot,
  getMode,
  (neck: string[][], root: string, mode: number[]): string[][] => {
    console.log(root, mode)
    if (root === null) {
      return neck;
    }

    // if (mode === null) { // root selected but no mode => show root notes only
    //   return neck.map(fret => fret.map(slink => (slink === root) ? slink : null));
    // }

    const selectedNotes = !!mode ? parseNotesFromFormula(root, mode) : [root];

    return neck.map((fret) => {
      return fret.map(slink => selectedNotes.includes(slink) ? slink : null);
    });
  },
);
