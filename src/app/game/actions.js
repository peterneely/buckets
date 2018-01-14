import * as types from './types';

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function setBucketValue(id, value) {
  return { type: types.SET_BUCKET_VALUE, payload: { id, value } };
}

export function setTarget(value) {
  return { type: types.SET_TARGET, payload: value };
}
