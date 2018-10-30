import { setHash } from '../../../helpers/utils';

import MODULE from '..';
const TYPE = 'scale';


export const SELECT = `[${MODULE}][${TYPE}] Select Scale`;
export const SelectAction = (payload: string) => async (dispatch) => {
  setHash('scale', payload);
  return dispatch({
    type: SELECT,
    payload,
  });
}