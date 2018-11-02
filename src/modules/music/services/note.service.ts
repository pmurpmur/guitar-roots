import { transpose } from 'ramda';
import { Note as n, Note } from '../models';


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
export function colorizeNotes(selectedNotes: number[], currNote: Note): { backgroundColor: string, color: string } {
  const index  = selectedNotes.indexOf(currNote);
  if (index === -1) { return null; }
  
  const fraction = Math.round(12 / selectedNotes.length);
  
  switch (index * fraction) {
    case 0: return {
      backgroundColor: '#FF4136',
      color: 'hsla(3, 100%, 25%, 1.0)',
    }
    case 1: return {
      backgroundColor: '#FF851B',
      color: 'hsla(28, 100%, 20%, 1.0)',
    }
    case 2: return {
      backgroundColor: '#FFDC00',
      color: 'hsla(52, 100%, 20%, 1.0)',
    }
    case 3: return {
      backgroundColor: '#01FF70',
      color: 'hsla(146, 100%, 20%, 1.0)',
    }
    case 4: return {
      backgroundColor: '#2ECC40',
      color: 'hsla(127, 63%, 15%, 1.0)',
    }
    case 5: return {
      backgroundColor: '#3D9970',
      color: 'hsla(153, 43%, 15%, 1.0)',
    }
    case 6: return {
      backgroundColor: '#39CCCC',
      color: '#000',
    }
    case 7: return {
      backgroundColor: '#7FDBFF',
      color: 'hsla(197, 100%, 20%, 1.0)',
    }
    case 8: return {
      backgroundColor: '#0074D9',
      color: 'hsla(208, 100%, 85%, 1.0)',
    }
    case 9: return {
      backgroundColor: '#001F3F',
      color: 'hsla(210, 100%, 75%, 1.0)',
    }
    case 10: return {
      backgroundColor: '#B10DC9',
      color: 'hsla(292, 88%, 82%, 1.0)',
    }
    case 11: return {
      backgroundColor: '#F012BE',
      color: 'hsla(314, 88%, 21%, 1.0)',
    }
    case 12: return {
      backgroundColor: '#85144B',
      color: 'hsla(331, 74%, 70%, 1.0)',
    }
    default: return null;
  }
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
