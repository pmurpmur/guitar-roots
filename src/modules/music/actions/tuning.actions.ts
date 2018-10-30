import { setHashParam } from '../../../helpers/url-utilities';

import MODULE from '..';
const TYPE = 'tuning';


export const SELECT = `[${MODULE}][${TYPE}] Select Tuning`;
export const SelectAction = (payload: string) => async (dispatch) => {
  setHashParam('tuning', payload);
  return dispatch({
    type: SELECT,
    payload,
  });
}

export const TUNE_STRING = `[${MODULE}][${TYPE}] Tune String`;
export const TuneStringAction = (payload: { stringNum: number, pitch: string }) => async (dispatch) => {
  setHashParam(`string:${payload.stringNum}`, payload.pitch);
  return dispatch({
    type: TUNE_STRING,
    payload,
  });
}

export const SET_STRINGS = `[${MODULE}][${TYPE}] Set Strings`;
export const SetStringsAction = (payload: string) => async (dispatch) => {
  setHashParam('strings', payload);
  return dispatch({
    type: SET_STRINGS,
    payload,
  });
}
