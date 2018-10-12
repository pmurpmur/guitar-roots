/**
 * Simple action interface
 */
export interface Action {
  type: string;
  payload?: any;
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