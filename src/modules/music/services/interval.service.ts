/**
 * Intervals to semitones
 */
export function toSemitones(formula: string[]): number[] {
  return formula.map((inteval: string) => {
    switch (inteval) {
      case '1P': return 0;
      case '2m': return 1;
      case '2M': return 2;
      case '3m': return 3;
      case '3M': return 4;
      case '4P': return 5;
      case '4A':
      case '5d': return 6;
      case '5P': return 7;
      case '5A':
      case '6m': return 8;
      case '6M':
      case '7d': return 9;
      case '7m': return 10;
      case '7M': return 11;
      case '8P': return 12;
    }
  });
}

/**
 * Semitones to intervals
 */
export function fromSemitones(formula: number[], augmented = true): string[] {
  return formula.map((note: number) => {
    switch (note) {
      case 0: return '1P';
      case 1: return '2m';
      case 2: return '2M';
      case 3: return '3m';
      case 4: return '3M';
      case 5: return '4P';
      case 6: return augmented ? '4A' : '5d';
      case 7: return '5P';
      case 8: return augmented ? '5A' : '6m';
      case 9: return augmented ? '6M' : '7d';
      case 10: return '7m';
      case 11: return '7M';
      case 12: return '8P';
      default: return null;
    }
  });
}

/**
 * Parse intervals to numbers
 */
export function toNumberSystem(intervals: string[]): string[] {
  return intervals.length > 7 ? intervals : intervals.map(pos => pos.match(/\d+/g)[0]);
}
