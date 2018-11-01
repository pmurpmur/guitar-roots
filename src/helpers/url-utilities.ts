// URL Utilities
// |  o    _______________
// |  /\_  _|             |
// |  _\__`[_______________|
// |  ] [ \, ][         ][


export function getHash(url: string): string {
  return url.substring(url.lastIndexOf('#'));
}

export function getHashParam(url: string, param: string): string {
  const re = new RegExp(`#.*[?&]${param}=([^&]+)(&|$)`);
  const match = url.match(re);
  return match ? match[1] : '';
}

export function setHash(hash: string): void {
  window.history.replaceState(null, null, `${document.location.pathname}#${hash}`);
}

export function setHashParam(name: string, value: string): void {
  const regex = new RegExp(`(${name}=).*?(&|$)`);
  
  const hash = window.location.hash.slice(1);
  if (hash.match(regex) === null) {
    setHash(`${hash.length === 0 ? '' : `${hash}&`}${name}=${value}`);
  } else {
    setHash(hash.replace(regex,`$1${value}$2`));
  }
}

export function getHashParamsList(hash: string): { key: string, value: string }[] {
  const result = [];
  hash.replace(/[#&]+([^=&]+)=([^&]*)/gi, (substr, key, value) => {
    result.push({ key, value });
    return substr;
  });
  return result;
}

export function getHashParamsEntities(hash: string): { [key: string]: string } {
  const result = {};
  hash.replace(/[#&]+([^=&]+)=([^&]*)/gi, (substr, key, value) => {
    result[key] = value;
    return substr;
  });
  return result;
} 

