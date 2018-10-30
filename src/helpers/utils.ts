// Utility functions
//  _______________________________________________________
// |:::::: o o o o . |..... . .. . | [45]  o o o o o ::::::|
// |:::::: o o o o   | ..  . ..... |       o o o o o ::::::|
// |::::::___________|__..._...__._|_________________::::::|
// | # # | # # # | # # | # # # | # # | # # # | # # | # # # |
// | # # | # # # | # # | # # # | # # | # # # | # # | # # # |
// | # # | # # # | # # | # # # | # # | # # # | # # | # # # |
// | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
// |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|


export function ordinalSuffixOf(i: number): string {
  let j = i % 10;
  let k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}


export function setHash(name: string, value: string): void {
  const regex = new RegExp(`(${name}=).*?(&|$)`);
  
  const hash = window.location.hash.startsWith('##') ? window.location.hash : `#${window.location.hash}`;
  if (hash.match(regex) === null) {
    window.location.hash = `${hash.length === 0 ? '' : `${hash}&`}${name}=${value}`;
  } else {
    window.location.hash = hash.replace(regex,`$1${value}$2`);
  }
}

export function removeHashBlock(): void {
  window.location.hash = window.location.hash.replace(/#*/, '');
}
