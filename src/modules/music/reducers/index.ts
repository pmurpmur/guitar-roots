import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { note, interval } from '../services';
import { NoteDetails, Note, Scale, Tuning } from '../models';

import MODULE from '..';
import * as fromNote from './note.reducer';
import * as fromScale from './scale.reducer';
import * as fromTuning from './tuning.reducer';


export interface State {
  note: fromNote.State,
  scale: fromScale.State,
  tuning: fromTuning.State,
}

export const reducer = (combineReducers as any)({
  note: fromNote.reducer,
  scale: fromScale.reducer,
  tuning: fromTuning.reducer,
});


// Selector Functions
// --------------------------------------------------
// Returns a function that maps from the larger state tree to a smaller state.

const getModuleState = (state: any) => state[MODULE];

const getNoteState = createSelector(getModuleState, (state: State) => state.note);
export const getNotes = createSelector(getNoteState, fromNote.getNotes);
export const getSelectedNote = createSelector(getNoteState, fromNote.getSelectedNote);
export const isFlat = createSelector(getNoteState, fromNote.isFlat);
export const isNumberSystem = createSelector(getNoteState, fromNote.isNumberSystem);

const getScaleState = createSelector(getModuleState, (state: State) => state.scale);
export const getScales = createSelector(getScaleState, fromScale.getItems);
export const getSelectedScale = createSelector(getScaleState, fromScale.getSelectedEntity);

const getTuningState = createSelector(getModuleState, (state: State) => state.tuning);
export const getTunings = createSelector(getTuningState, fromTuning.getItems);
export const getSelectedTuning = createSelector(getTuningState, fromTuning.getSelectedEntity);


/**
 * Get selected notes within the rooted scale
 */
export const getSelectedNotes = createSelector(
  getSelectedNote,
  getSelectedScale,
  (rootNote: Note, scale: Scale): number[] => {
    return interval.toSemitones(scale.value).map(semitoneDistance => rootNote + semitoneDistance);
  },
);

/**
 * Get selected notes within the rooted scale
 */
export const getNumberSystemIntervals = createSelector(
  getSelectedScale,
  (scale: Scale): number[] => {
    return scale ? interval.toNumberSystem(scale.value) : null;
  },
);


/**
 * Form a note matrix (this will be cached in memory)
 */
export const getNoteMatrix = createSelector(
  getSelectedTuning,
  (tuning: Tuning): number[][] => {
    return note.createNoteMatrix(tuning.value, {
      length: 12,
      groupBy: 'semitone',
    });
  },
);

/**
 * Apply functional filters and visual options to note matrix
 */
export const getFilteredNoteMatrix = createSelector(
  getNoteMatrix,
  getSelectedNote,
  getSelectedNotes,
  (noteMatrix: number[][], rootNote: Note, selectedNotes: number[]): number[][] => {
    if (rootNote === null) {
      return noteMatrix;
    }
    return noteMatrix.map(fret => fret.map(note => selectedNotes.includes(note) ? note : null));
  },
);

/**
 * Form a visual options object
 */
export const getVisualOptions = createSelector(
  getNotes,
  getSelectedNotes,
  getNumberSystemIntervals,
  isFlat,
  (notes: Note[], selectedNotes: number[], numberIntervals: number[], isFlat: boolean): { [id: string]: NoteDetails } => {
    return notes.reduce((prev: { [id: string]: NoteDetails }, curr: Note) => ({
      ...prev,
      [curr]: {
        note: curr,
        pitchClass: note.stringifyNote(curr, isFlat),
        scaleNumber: numberIntervals ? numberIntervals[selectedNotes.indexOf(curr)] : null,
      },
    }), {});
  },
);
