const MODULE = 'Tuning';
const TYPE = 'Tuning';


export const SELECT_NOTE = `[${MODULE}][${TYPE}] Select Note`;
export const SelectNoteAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT_NOTE,
  payload,
});

export const TUNE = `[${MODULE}][${TYPE}] Tune String Set`;
export const TuneAction = (payload: string[]) => async (dispatch) => dispatch({
  type: SELECT_NOTE,
  payload,
});
