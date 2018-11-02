import { createHashAction } from '../../../helpers/redux-utilities';

import MODULE from '..';
const TYPE = 'note';


export const SELECT_ROOT = `[${MODULE}][${TYPE}] Select Root`;
export const SelectRootAction = createHashAction({
  type: SELECT_ROOT,
  hashKey: 'root', 
});

export const SELECT_NAMING = `[${MODULE}][${TYPE}] Select Naming`;
export const SelectNamingAction = createHashAction({
  type: SELECT_NAMING,
  hashKey: 'naming', 
});

export const SELECT_ACCIDENTAL = `[${MODULE}][${TYPE}] Select Accidental`;
export const SelectAccidentalAction = createHashAction({
  type: SELECT_ACCIDENTAL,
  hashKey: 'accidental', 
});

export const TOGGLE_COLOR = `[${MODULE}][${TYPE}] Toggle Color`;
export const ToggleColorAction = createHashAction({
  type: TOGGLE_COLOR,
  hashKey: 'color',
  toHashValue: payload => payload ? 'true' : 'false',
  fromHashValue: payload => payload === 'true',
});
