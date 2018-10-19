export interface Tuning {
  id: number,
  label: string,
  value: string[],
}

export const defaultTunings: { [label: string]: string[] } = {
  'standard': ['E', 'B', 'G', 'D', 'A', 'E'],
  'bass guitar standard': ['E', 'B', 'G', 'D'],
  'ukulele standard': ['G', 'C', 'E', 'A'],
  'ukulele baritone': ['G', 'D', 'A', 'E'],
  'drop D': ['D', 'B', 'G', 'D', 'A', 'E'],
  'modal D / Dsus4': ['D', 'A', 'D', 'G', 'A', 'D'],
  // 'double drop D': ['D', 'B', 'G', 'D', 'A', 'D'],
  // 'open G': ['D', 'G', 'D', 'G', 'B', 'D'],
  // 'open D': ['D', 'A', 'D', 'F#', 'A', 'D'],
  // 'open C6': ['C', 'A', 'C', 'G', 'C', 'E'],
  // '"Nick Drake" tuning': ['C', 'G', 'C', 'F', 'C', 'E'],
  // 'EEEEBE tuning': ['E', 'E', 'E', 'E', 'B', 'E'],
};
