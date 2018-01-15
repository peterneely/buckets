import * as types from './types';
import { toInt } from '_layout/format';

export function pauseGame() {
  return { type: types.PAUSE_GAME };
}

export function playGame() {
  return { type: types.PLAY_GAME };
}

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function setBucketSize(bucketId, size) {
  const onValid = sizeInt => {
    return (dispatch, getState) => {
      dispatch({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: sizeInt } });
      dispatch({ type: preventPlay(getState) ? types.PREVENT_PLAY : types.ENABLE_PLAY });
    };
  };
  return setSize({ size, onValid });
}

export function setTargetSize(size) {
  const onValid = sizeInt => {
    return (dispatch, getState) => {
      dispatch({ type: types.SET_TARGET_SIZE, payload: sizeInt });
      dispatch({ type: preventPlay(getState) ? types.PREVENT_PLAY : types.ENABLE_PLAY });
    };
  };
  return setSize({ size, onValid });
}

function isEven(number) {
  return number % 2 === 0;
}

function isOdd(number) {
  return number % 2 === 1;
}

function preventPlay(getState) {
  const { game: { left, right, target } } = getState();
  return isEven(left.size) && isEven(right.size) && isOdd(target);
}

function setSize({ size, onValid }) {
  const sizeInt = toInt(size);
  const isValid = size >= 1 && sizeInt == size;
  if (isValid) return onValid(sizeInt);
  return { type: types.NO_ACTION };
}
