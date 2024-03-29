import { set, lens, prop, assoc } from 'ramda';

import { createReducer } from '../../../helpers/redux-utilities';
import { parseNote } from '../services/note.service';

import * as actions from '../actions/note.actions';
import { Note as n } from '../models/note.model';


export interface State {
  notes: n[],
  selectedNote: n | null,
  root: n,
  naming: string,
  accidental: string,
  color: boolean,
};

export const initialState: State = {
  notes: [n.A, n.AB, n.B, n.C, n.CD, n.D, n.DE, n.E, n.F, n.FG, n.G, n.GA],
  selectedNote: null,
  root: null,
  naming: 'pitch',
  accidental: 'flat',
  color: false,
};


export const reducer = createReducer(initialState, {
  [actions.SELECT_ROOT]: (payload) => set(lens(prop('root'), assoc('root')))(parseNote(payload)),
  [actions.SELECT_NAMING]: assoc('naming'),
  [actions.SELECT_ACCIDENTAL]: assoc('accidental'),
  [actions.TOGGLE_COLOR]: assoc('color'),
});


// Selector Functions
// --------------------------------------------------

export const getNotes = (state: State) => state.notes;
export const getSelectedNote = (state: State) => state.selectedNote;
export const getRoot = (state: State) => state.root;
export const isPitchClass = (state: State) => state.naming === 'pitch';
export const isNumberSystem = (state: State) => state.naming === 'number';
export const isFlat = (state: State) => state.accidental === 'flat';
export const isSharp = (state: State) => state.accidental === 'sharp';
export const hasColor = (state: State) => state.color;
