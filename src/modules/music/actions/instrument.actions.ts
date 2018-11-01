import { createHashAction } from '../../../helpers/redux-utilities';

import MODULE from '..';
const TYPE = 'instrument';


export const SET_FRETS = `[${MODULE}][${TYPE}] Set Frets`;
export const SetAction = createHashAction({
  type: SET_FRETS,
  hashKey: 'frets', 
});
