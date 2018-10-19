import MODULE from '..';
const TYPE = 'scale';


export const SELECT = `[${MODULE}][${TYPE}] Select Scale`;
export const SelectAction = (payload: string) => async (dispatch) => dispatch({
  type: SELECT,
  payload,
});
