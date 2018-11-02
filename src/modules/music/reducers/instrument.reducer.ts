import { assoc } from 'ramda';

import { createReducer } from '../../../helpers/redux-utilities';

import * as actions from '../actions/instrument.actions';


export interface State {
  frets: number,
  locked: boolean,
  unlocked: boolean,
};

export const initialState: State = {
  frets: 13,
  locked: false,
  unlocked: true,
};


export const reducer = createReducer(initialState, {
  [actions.SET_FRETS]: assoc('frets'),
  [actions.LOCK]: assoc('locked'),
  [actions.UNLOCK]: assoc('unlocked'),
});


// Selector Functions
// --------------------------------------------------

export const getFrets = (state: State) => state.frets;
export const isLocked = (state: State) => state.locked;
export const isUnlocked = (state: State) => state.unlocked;
