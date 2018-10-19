export { Note } from './note.model';
export { Scale } from './scale.model';
export { Tuning } from './tuning.model';


export interface NoteDetails {
  note: number,
  pitchClass: string,
  scaleNumber: number,
};
