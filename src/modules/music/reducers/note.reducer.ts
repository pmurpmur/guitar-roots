import { set, lens, prop, assoc } from 'ramda';

import { createReducer } from '../../../helpers/redux-utilities';
import { parseNote } from '../services/note.service';

import * as actions from '../actions/note.actions';
import { Note as n } from '../models/note.model';


export interface State {
  notes: n[],
  selectedNote: n | null,
  naming: string,
  accidental: string,
};

export const initialState: State = {
  notes: [n.A, n.AB, n.B, n.C, n.CD, n.D, n.DE, n.E, n.F, n.FG, n.G, n.GA],
  selectedNote: null,
  naming: 'pitchClass',
  accidental: 'flat',
};


export const reducer = createReducer(initialState, {
  [actions.SELECT]: (payload) => set(lens(prop('selectedNote'), assoc('selectedNote')))(parseNote(payload)),
  [actions.SELECT_NAMING]: assoc('naming'),
  [actions.SELECT_ACCIDENTAL]: assoc('accidental'),
});


// Selector Functions
// --------------------------------------------------

export const getNotes = (state: State) => state.notes;
export const getSelectedNote = (state: State) => state.selectedNote;
export const isPitchClass = (state: State) => state.naming === 'pitchClass';
export const isNumberSystem = (state: State) => state.naming === 'numberSystem';
export const isFlat = (state: State) => state.accidental === 'flat';
export const isSharp = (state: State) => state.accidental === 'sharp';
