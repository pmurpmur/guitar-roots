import { setHashParam } from '../helpers/url-utilities';

/**
 * Simple action interface
 */
export interface Action {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean,
}

/**
 * Factory for reducer functions
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](action.payload)(state);
    }
    else if (action.type === 'DESTRUCT') {
      return initialState
    } else {
      return state;
    }
  }
}

/**
 * Factory for reducer functions
 */
let hashParamsType: { [key: string]: string } = {};
let hashParamsMap: { [key: string]: Function } = {};
export function createHashAction({
  type,
  hashKey,
  toHashValue = payload => payload,
  fromHashValue = payload => payload,
} : {
  type: string,
  hashKey: string,
  toHashValue?: Function,
  fromHashValue?: Function,
}) {
  if (!hashParamsType[hashKey]) {
    hashParamsType = {
      ...hashParamsType,
      [hashKey]: type,
    };
  }

  if (!hashParamsMap[hashKey]) {
    hashParamsMap = {
      ...hashParamsMap,
      [hashKey]: fromHashValue,
    };
  }

  return (payload: any) => {
    setHashParam(hashKey, toHashValue(payload));

    return dispatch => dispatch({
      type: type,
      payload: payload,
    });
  }
}

export function getHashAction(payload: { key: string, value: string }) {
  return {
    type: hashParamsType[payload.key],
    payload: hashParamsMap[payload.key](payload.value),
  };
}

/**
 * Initialize entity pattern ids from a plain old object
 */
export function initializeIds(data: { [label: string]: string[] }): number[] {
  return Object.keys(data).map((_key, index) => index + 1);
}

/**
 * Initialize entity pattern entities for from a plain old object
 */
export function intializeEntities(data: { [label: string]: string[] }): { [id: number]: { id: number, label: string, value: any }} {
  const entries = Object.entries(data);
  return entries.reduce((prev, [label, value], index) => {
    const id = index + 1;
    return {
      ...prev,
      [id]: { id, label, value }
    };
  }, {});
}
