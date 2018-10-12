/**
 * Convert notes to integers
 */
export function parseNote(note: string): number {
  switch(note) {
    case 'A': return 1;
    case 'A+':
    case 'Bb': return 2;
    case 'B': return 3;
    case 'C': return 4;
    case 'C+':
    case 'Db': return 5;
    case 'D': return 6;
    case 'D+':
    case 'Eb': return 7;
    case 'E': return 8;
    case 'F': return 9;
    case 'F+':
    case 'Gb': return 10;
    case 'G': return 11;
    case 'G+':
    case 'Ab': return 12;
    default: return 0;
  }
}

/**
 * Note to string
 */
export function noteToString(note: number, flats = true): string {
  switch(note % 12) {
    case 0: return flats ? 'Ab' : 'G+';
    case 1: return 'A';
    case 2: return flats ? 'Bb' : 'A+';
    case 3: return 'B';
    case 4: return 'C';
    case 5: return flats ? 'Db' : 'C+';
    case 6: return 'D';
    case 7: return flats ? 'Eb' : 'D+';
    case 8: return 'E';
    case 9: return 'F';
    case 10: return flats ? 'Gb' : 'F+';
    case 11: return 'G';
    default: return '';
  }
}

/**
 * Calculate fretted notes
 */
export function calcFrettedNotes(startNote: string, numFrets = 12): string[] {
  const note = parseNote(startNote);

  let result = [];
  for (let i = 0; i <= numFrets; i++) {
    result.push(noteToString(note + i));
  }
  return result;
}
