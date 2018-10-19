import { set, lens, prop, assoc, over, lensProp, not } from 'ramda';

import { createReducer } from '../../../helpers/redux-utilities';
import { parseNote } from '../services/note.service';

import * as actions from '../actions/note.actions';
import { Note as n } from '../models/note.model';


export interface State {
  notes: n[],
  selectedNote: n | null,
  numberSystem: boolean,
  flat: boolean,
};

export const initialState: State = {
  notes: [n.A, n.AB, n.B, n.C, n.CD, n.D, n.DE, n.E, n.F, n.FG, n.G, n.GA],
  selectedNote: null,
  numberSystem: false,
  flat: true,
};


export const reducer = createReducer(initialState, {
  [actions.SELECT]: (payload) => set(lens(prop('selectedNote'), assoc('selectedNote')))(parseNote(payload)),
  [actions.TOGGLE_NAMING]: () => over(lensProp('numberSystem'), not),
  [actions.TOGGLE_ACCIDENTAL]: () => over(lensProp('flat'), not),
});


// Selector Functions
// --------------------------------------------------

export const getNotes = (state: State) => state.notes;
export const getSelectedNote = (state: State) => state.selectedNote;
export const isFlat = (state: State) => state.flat;
export const isNumberSystem = (state: State) => state.numberSystem;
