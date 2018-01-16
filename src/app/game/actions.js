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

// Steps:

export function startSteps() {
  return (dispatch, getState) => {
    const { game: { buckets: { left, right } } } = getState();
    const big = left.size > right.size ? 'left' : 'right';
    const small = big === 'left' ? 'right' : 'left';
    dispatch({ type: types.SET_BIG_SMALL_BUCKETS, payload: { big, small } });
    dispatch({ type: types.INITIALIZE_STEPS_LOG, payload: { log: [{ left: 0, right: 0 }] } });
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
    const {
      [big]: { value: bigValue },
      [small]: { size: smallSize, value: smallValue },
    } = buckets;
    // const newSmallValue = (smallValue + bigValue) < smallSize ? smallValue + bigValue : 
    const newLog = [...log];
    newLog.push({ [small]: smallSize, [big]: bigValue });
    const payload = {
      buckets: {
        [big]: { value: bigValue },
        [small]: { value: smallValue },
      },
      steps: { log: newLog },
    };
    dispatch({ type: types.FILL, payload });
    dispatch(setNextStep(''));
  };
}

function setNextStep(step) {
  return dispatch => {
    setTimeout(() => dispatch({ type: types.SET_NEXT_STEP, payload: step }), 1500);
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
