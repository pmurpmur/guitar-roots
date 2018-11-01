import { assoc } from 'ramda';

import { createReducer } from '../../../helpers/redux-utilities';

import * as actions from '../actions/instrument.actions';


export interface State {
  frets: number,
};

export const initialState: State = {
  frets: 13,
};


export const reducer = createReducer(initialState, {
  [actions.SET_FRETS]: assoc('frets'),
});


// Selector Functions
// --------------------------------------------------

export const getFrets = (state: State) => state.frets;
