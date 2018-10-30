// URL Utilities
// |  o    _______________
// |  /\_  _|             |
// |  _\__`[_______________|
// |  ] [ \, ][         ][


export function getHash(url: string): string {
  return url.substring(url.lastIndexOf('#'));
}

export function setHash(hash: string): void {
  window.location.hash = `#${hash}`;
}

export function getHashParam(url: string, param: string): string {
  const re = new RegExp(`#.*[?&]${param}=([^&]+)(&|$)`);
  const match = url.match(re);
  return match ? match[1] : '';
}

export function setHashParam(name: string, value: string): void {
  const regex = new RegExp(`(${name}=).*?(&|$)`);
  
  const hash = window.location.hash.startsWith('##') ? window.location.hash : `#${window.location.hash}`;
  if (hash.match(regex) === null) {
    window.location.hash = `${(hash.startsWith('##') && hash.length === 2 || hash.startsWith('#') && hash.length === 1) ? '' : `${hash}&`}${name}=${value}`;
  } else {
    window.location.hash = hash.replace(regex,`$1${value}$2`);
  }
}

export function getHashParamsList(hash: string): { key: string, value: string }[] {
  const result = [];
  hash.replace(/[?&]+([^=&]+)=([^&]*)/gi, (substr, key, value) => {
    result.push({ key, value });
    return substr;
  });
  return result;
}

export function getHashParamsEntities(hash: string): { [key: string]: string } {
  const result = {};
  hash.replace(/[?&]+([^=&]+)=([^&]*)/gi, (substr, key, value) => {
    result[key] = value;
    return substr;
  });
  return result;
} 

export function removeHashBlock(): void {
  window.location.hash = window.location.hash.replace(/#*/, '');
}
