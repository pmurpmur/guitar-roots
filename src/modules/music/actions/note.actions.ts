import { setHashParam } from '../../../helpers/url-utilities';

import MODULE from '..';
const TYPE = 'note';


export const SELECT = `[${MODULE}][${TYPE}] Select Note`;
export const SelectAction = (payload: string) => async (dispatch) => {
  setHashParam('root', payload);
  return dispatch({
    type: SELECT,
    payload,
  });
}

export const SELECT_NAMING = `[${MODULE}][${TYPE}] Select Naming`;
export const SelectNamingAction = (payload: string) => async (dispatch) => {
  setHashParam('naming', payload);
  return dispatch({
    type: SELECT_NAMING,
    payload,
  });
}

export const SELECT_ACCIDENTAL = `[${MODULE}][${TYPE}] Select Accidental`;
export const SelectAccidentalAction = (payload: string) => async (dispatch) => {
  setHashParam('accidental', payload);
  return dispatch({
    type: SELECT_ACCIDENTAL,
    payload,
  });
}
