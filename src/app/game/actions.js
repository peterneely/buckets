import * as types from './types';
import { toInt } from '_layout/format';

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function setBucketSize(bucketId, size) {
  return setSize({ size, onValid: sizeInt => ({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: sizeInt } }) });
}

export function setTargetSize(size) {
  return setSize({ size, onValid: sizeInt => ({ type: types.SET_TARGET_SIZE, payload: sizeInt }) });
}

function setSize({ size, onValid }) {
  const sizeInt = toInt(size);
  const isValid = size >= 1 && sizeInt == size;
  if (isValid) return onValid(sizeInt);
  return { type: types.NO_ACTION };
}
