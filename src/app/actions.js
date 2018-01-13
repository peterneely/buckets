import * as types from './types';

export function setTarget(value) {
  return { type: types.SET_TARGET, payload: value };
}
