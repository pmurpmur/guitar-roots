import { setHashParam } from '../../../helpers/url-utilities';

import MODULE from '..';
const TYPE = 'scale';


export const SELECT = `[${MODULE}][${TYPE}] Select Scale`;
export const SelectAction = (payload: string) => async (dispatch) => {
  setHashParam('scale', payload);
  return dispatch({
    type: SELECT,
    payload,
  });
}