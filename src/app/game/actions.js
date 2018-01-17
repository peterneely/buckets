import * as types from './types';
import { toInt } from '_layout/format';
import { validators } from './gameValidators';
import { transferBuckets } from './buckets';

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

// Steps:

export function startSteps() {
  return (dispatch, getState) => {
    const { game: { buckets: { left, right } } } = getState();
    const big = left.size > right.size ? 'left' : 'right';
    const small = big === 'left' ? 'right' : 'left';
    const payload = {
      buckets: { big, left: { value: 0 }, right: { value: 0 }, small },
      play: { leftWins: false, rightWins: false },
      steps: { log: [{ left: 0, right: 0 }] },
    };
    dispatch({ type: types.CLEAR_STEPS_LOG });
    dispatch({ type: types.START_STEPS, payload });
    dispatch(setNextStep('fill'));
  };
}

export function fill() {
  return (dispatch, getState) => {
    const { game: { buckets, steps: { log } } } = getState();
    const { big, small } = buckets;
    const { [big]: { size: bigSize }, [small]: { value: smallValue } } = buckets;
    const newLog = [...log];
    newLog.push({ [small]: smallValue, [big]: bigSize });
    const payload = {
      buckets: { [big]: { value: bigSize } },
      steps: { log: newLog },
    };
    dispatch({ type: types.FILL, payload });
    dispatch(setNextStep('transfer'));
  };
}

export function transfer() {
  return (dispatch, getState) => {
    const { game: { buckets, steps: { log } } } = getState();
    const { big, small } = buckets;
    const { [big]: bigBucket, [small]: smallBucket } = buckets;
    const { bucket1: newBigBucket, bucket2: newSmallBucket } = transferBuckets(bigBucket, smallBucket);
    const newLog = [...log];
    newLog.push({ [small]: newSmallBucket.value, [big]: newBigBucket.value });
    const payload = {
      buckets: { [big]: newBigBucket, [small]: newSmallBucket },
      steps: { log: newLog },
    };
    dispatch({ type: types.TRANSFER, payload });
    dispatch(setNextStep(''));
  };
}

function setNextStep(step) {
  return (dispatch, getState) => {
    const { game: { buckets: { left, right }, target } } = getState();
    if (left.value === target) dispatch({ type: types.LEFT_WINS });
    else if (right.value === target) dispatch({ type: types.RIGHT_WINS });
    else setTimeout(() => dispatch({ type: types.SET_NEXT_STEP, payload: step }), 1500);
  };
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
