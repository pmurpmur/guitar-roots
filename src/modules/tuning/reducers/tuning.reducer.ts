import { transpose } from 'ramda';
import { createSelector } from 'reselect';

import { calcFrettedNotes } from '../../../helpers/music-theory';
import { createReducer } from '../../../helpers/redux-utilities';

import * as actions from '../actions/tuning.actions';


export interface State {
  tuning: string[],
  neck: string[][],
  selectedNote: string,
};

export const initialState: State = {
  tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
  neck: transpose([
    calcFrettedNotes('E'),
    calcFrettedNotes('B'),
    calcFrettedNotes('G'),
    calcFrettedNotes('D'),
    calcFrettedNotes('A'),
    calcFrettedNotes('E'),
  ]),
  selectedNote: null,
};


const tuneData = (payload: string[]) => {
  let neck = [];
  payload.forEach((slinky: string) => {
    neck = [
      ...neck,
      calcFrettedNotes(slinky),
    ];
  });

  return (state: State): State => ({
    ...state,
    tuning: payload,
    neck: transpose(neck),
  });
}


export const reducer = createReducer(initialState, {
  [actions.SELECT_NOTE]: payload => state => ({
    ...state,
    selectedNote: payload,
  }),
  [actions.TUNE]: tuneData,
});


export const getTuning = (state: State) => state.tuning;
export const getNeck = (state: State) => state.neck;
export const getSelectedNote = (state: State) => state.selectedNote;

export const getFilteredNeck = createSelector(
  getNeck,
  getSelectedNote,
  (neck: string[][], selectedNote: string): string[][] => {
    return neck.map((fret) => {
      return fret.map((slink) => (selectedNote === null || slink === selectedNote) ? slink : null)
    });
  },
);
