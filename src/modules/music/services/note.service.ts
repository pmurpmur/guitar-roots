import { transpose } from 'ramda';
import { Note as n } from '../models';


/**
 * Note to encoding
 */
export function parseNote(note: string): number {
  switch (note) {
    case 'A': return n.A;
    case 'A#':
    case 'Bb': return n.AB;
    case 'B': return n.B;
    case 'C': return n.C;
    case 'C#':
    case 'Db': return n.CD;
    case 'D': return n.D;
    case 'D#':
    case 'Eb': return n.DE;
    case 'E': return n.E;
    case 'F': return n.F;
    case 'F#':
    case 'Gb': return n.FG;
    case 'G': return n.G;
    case 'G#':
    case 'Ab': return n.GA;
    default: return null;
  }
}

/**
 * Encoding to pitch class
 */
export function stringifyNote(note: number, flats = true): string {
  if (note === null) { return null; }

  switch ((note - 1) % 12 + 1) {
    case n.A: return 'A';
    case n.AB: return !flats ? 'A#' : 'Bb';
    case n.B: return 'B';
    case n.C: return 'C';
    case n.CD: return !flats ? 'C#' : 'Db';
    case n.D: return 'D';
    case n.DE: return !flats ? 'D#' : 'Eb';
    case n.E: return 'E';
    case n.F: return 'F';
    case n.FG: return !flats ? 'F#' : 'Gb';
    case n.G: return 'G';
    case n.GA: return !flats ? 'G#' : 'Ab';
    default: return null;
  }
}

/**
 * Encoding to pitch class
 */
export function stringifyNoteUTF(note: number, flats = true): string {
  if (note === null) { return null; }

  switch ((note - 1) % 12 + 1) {
    case n.A: return 'A';
    case n.AB: return !flats ? 'A\u266F' : 'B\u266D';
    case n.B: return 'B';
    case n.C: return 'C';
    case n.CD: return !flats ? 'C\u266F' : 'D\u266D';
    case n.D: return 'D';
    case n.DE: return !flats ? 'D\u266F' : 'E\u266D';
    case n.E: return 'E';
    case n.F: return 'F';
    case n.FG: return !flats ? 'F\u266F' : 'G\u266D';
    case n.G: return 'G';
    case n.GA: return !flats ? 'G\u266F' : 'A\u266D';
    default: return null;
  }
}

/**
 * Encoding to pitch class
 */
export function hasAccidental(note: number): boolean {
  return (note > 6 && note % 2 === 0) || (note < 6 && Math.abs(note % 2) === 1)
}

/**
 * Encoding to note
 */
export function fromSemitones(rootNote: number, scale: number[]): string[] {
  return scale.map(interval => stringifyNote(rootNote + interval));
}


/**
 * Colorize intervals
 */
export const rainbow = ['#ff3860', '#7044ff', '#186dff', '#209cee', '#00d1b2', '#23d160', '#ffa400']
export function colorizeNotes(index: number): string {
  return rainbow[index];
}

/**
 * Create note set (note being its integer representation)
 */
export function createNoteSet(startNote: string, length = 12): number[] {
  const note = parseNote(startNote);

  const result = [];
  for (let i = 0; i <= length; i++) {
    result.push(((note - 1) + i) % 12 + 1);
  }
  return result;
}

/**
 * Create note matrix (note being its integer representation)
 */
export function createNoteMatrix(tuning: string[], options?: { length?: number, groupBy?: string }): number[][] {
  const noteMatrix = tuning.reduce((collection: number[][], note: string): number[][] => [
    ...collection,
    createNoteSet(note, options.length),
  ], [[]]);

  if (options.groupBy === 'semitone') {
    return transpose(noteMatrix);
  }
  return noteMatrix;
}
