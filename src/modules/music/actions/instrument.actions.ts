import { createHashAction } from '../../../helpers/redux-utilities';

import MODULE from '..';
const TYPE = 'instrument';


export const SET_FRETS = `[${MODULE}][${TYPE}] Set Frets`;
export const SetAction = createHashAction({
  type: SET_FRETS,
  hashKey: 'frets', 
});

export const LOCK = `[${MODULE}][${TYPE}] Lock`;
export const LockInstrumentAction = (payload: boolean) => ({
  type: LOCK,
  payload,
});

export const UNLOCK = `[${MODULE}][${TYPE}] Unlock`;
export const UnlockInstrumentAction = (payload: boolean) => ({
  type: UNLOCK,
  payload,
});