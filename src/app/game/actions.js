import * as types from './types';
import { toInt } from '_layout/format';
import { validators } from './gameValidators';

export function fill() {
  return (dispatch, getState) => {
    const { game: { buckets, steps: { log } } } = getState();
    const { big, small } = buckets;
    const { [big]: { size: bigSize }, [small]: { value: smallValue } } = buckets;
    const newLog = [...log];
    newLog.push({ [small]: smallValue, [big]: bigSize });
    const payload = {
      buckets: { [big]: { value: bigSize } },
      steps: { log: newLog, next: 'transfer' },
    };
    dispatch({ type: types.FILL, payload });
  };
}

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

export function startStepping() {
  return (dispatch, getState) => {
    const { game: { buckets: { left, right } } } = getState();
    const big = left.size > right.size ? 'left' : 'right';
    const small = big === 'left' ? 'right' : 'left';
    dispatch({ type: types.SET_BIG_SMALL_BUCKETS, payload: { big, small } });
    dispatch({ type: types.START_STEPPING, payload: { log: [{ left: 0, right: 0 }], next: 'fill' } });
  };
}

export function transfer() {
  return { type: types.NO_ACTION };
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
    const errorMessages = invalidResults.map(({ errorMessage }) => errorMessage);
    dispatch({ type: types.DISABLE_GAME, payload: !!invalidResults.length });
    dispatch({ type: types.SET_ERROR_MESSAGES, payload: errorMessages });
  };
}
