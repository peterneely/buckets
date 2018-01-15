import * as types from './types';
import { toInt } from '_layout/format';
import { validators } from './gameValidators';

export function pauseGame() {
  return { type: types.PAUSE_GAME };
}

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function setBucketSize(bucketId, size) {
  const ifValid = sizeInt => {
    return dispatch => {
      dispatch({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: sizeInt } });
      dispatch(tryDisableGame());
    };
  };
  return setSize({ size, ifValid });
}

export function setTargetSize(size) {
  const ifValid = sizeInt => {
    return dispatch => {
      dispatch({ type: types.SET_TARGET_SIZE, payload: sizeInt });
      dispatch(tryDisableGame());
    };
  };
  return setSize({ size, ifValid });
}

export function startGame() {
  return { type: types.START_GAME };
}

function setSize({ size, ifValid }) {
  const sizeInt = toInt(size);
  const isValid = size >= 1 && sizeInt == size;
  if (isValid) return ifValid(sizeInt);
  return { type: types.NO_ACTION };
}

function tryDisableGame() {
  return (dispatch, getState) => {
    const invalidResults = validators.map(({ isValid }) => isValid(getState)).filter(({ valid }) => !valid);
    const errorMesages = invalidResults.map(({ errorMesage }) => errorMesage);
    dispatch({ type: types.DISABLE_GAME, payload: !!invalidResults.length });
    dispatch({ type: types.SET_ERROR_MESSAGES, payload: errorMesages });
  };
}
