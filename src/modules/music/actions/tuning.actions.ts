import MODULE from '..';
const TYPE = 'tuning';


export const SELECT = `[${MODULE}][${TYPE}] Select Root`;
export const SelectAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT,
  payload,
});

export const TUNE_STRING = `[${MODULE}][${TYPE}] Tune String`;
export const TuneStringAction = (payload: { stringNum: number, pitch: string }) => async (dispatch) => dispatch({
  type: TUNE_STRING,
  payload,
});

export const SET_STRINGS = `[${MODULE}][${TYPE}] Set Strings`;
export const SetStringsAction = (payload: string) => async (dispatch) => dispatch({
  type: SET_STRINGS,
  payload,
});
