import { createHashAction } from '../../../helpers/redux-utilities';

import MODULE from '..';
const TYPE = 'scale';


export const SELECT = `[${MODULE}][${TYPE}] Select`;
export const SelectAction = createHashAction({
  type: SELECT,
  hashKey: 'scale', 
});
