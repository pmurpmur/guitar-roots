import MODULE from '..';
const TYPE = 'note';


export const SELECT = `[${MODULE}][${TYPE}] Select Note`;
export const SelectAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT,
  payload,
});

export const TOGGLE_NAMING = `[${MODULE}][${TYPE}] Toggle Naming`;
export const ToggleNamingAction = (payload: string) => async (dispatch) => dispatch({
  type: TOGGLE_NAMING,
  payload,
});

export const TOGGLE_ACCIDENTAL = `[${MODULE}][${TYPE}] Toggle Accidental`;
export const ToggleAccidentalAction = (payload: string) => async (dispatch) => dispatch({
  type: TOGGLE_ACCIDENTAL,
  payload,
});
