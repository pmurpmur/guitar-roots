export { Note } from './note.model';
export { Scale } from './scale.model';
export { Tuning } from './tuning.model';


export interface NoteDetails {
  note: number,
  name: string,
  letter: string,
  accidental: string,
  modifier?: string,
  octave?: number,
  number: string,
  colorStyle: {
    backgroundColor: string,
    color: string
  },
};
