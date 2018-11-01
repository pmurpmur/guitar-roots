import { createHashAction } from '../../../helpers/redux-utilities';

import MODULE from '..';
const TYPE = 'tuning';


export const TUNE = `[${MODULE}][${TYPE}] Tune Instrument`;
export const TuneAction = createHashAction({
  type: TUNE,
  hashKey: 'tuning', 
  toHashValue: payload => `[${payload.join(',')}]`,
  fromHashValue: payload => payload.slice(1, -1).split(','),
});
