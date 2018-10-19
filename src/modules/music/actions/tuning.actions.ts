import MODULE from '..';
const TYPE = 'tuning';


export const SELECT = `[${MODULE}][${TYPE}] Select Root`;
export const SelectAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT,
  payload,
});
