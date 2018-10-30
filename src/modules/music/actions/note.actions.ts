import { setHash } from '../../../helpers/utils';

import MODULE from '..';
const TYPE = 'note';


export const SELECT = `[${MODULE}][${TYPE}] Select Note`;
export const SelectAction = (payload: string) => async (dispatch) => {
  setHash('root', payload);
  return dispatch({
    type: SELECT,
    payload,
  });
}

export const SELECT_NAMING = `[${MODULE}][${TYPE}] Select Naming`;
export const SelectNamingAction = (payload: string) => async (dispatch) => {
  setHash('naming', payload);
  return dispatch({
    type: SELECT_NAMING,
    payload,
  });
}

export const SELECT_ACCIDENTAL = `[${MODULE}][${TYPE}] Select Accidental`;
export const SelectAccidentalAction = (payload: string) => async (dispatch) => {
  setHash('accidental', payload);
  return dispatch({
    type: SELECT_ACCIDENTAL,
    payload,
  });
}
