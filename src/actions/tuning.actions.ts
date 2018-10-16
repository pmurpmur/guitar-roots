const MODULE = 'Tuning';
const TYPE = 'Tuning';


export const SELECT_ROOT = `[${MODULE}][${TYPE}] Select Root`;
export const SelectRootAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT_ROOT,
  payload,
});

export const SET_MODE = `[${MODULE}][${TYPE}] Set Mode`;
export const SetModeAction = (payload: string) => async (dispatch) => dispatch({
  type: SET_MODE,
  payload,
});

export const TUNE = `[${MODULE}][${TYPE}] Tune String Set`;
export const TuneAction = (payload: string[]) => async (dispatch) => dispatch({
  type: TUNE,
  payload,
});
