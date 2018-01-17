import _ from 'lodash';
import * as types from './types';
import { startStepsState } from './initialState';
import { transferBuckets } from './buckets';
import { isSizeValid, validators } from './gameValidators';

export function dump() {
  return (dispatch, getState) => {
    const { game: { buckets, steps: { log } } } = getState();
    const { big, small } = buckets;
    const { [big]: bigBucket } = buckets;
    const newLog = [...log];
    newLog.push({ [small]: 0, [big]: bigBucket.value });
    const payload = { buckets: { [small]: { value: 0 } }, steps: { log: newLog } };
    dispatch({ type: types.DUMP, payload });
    const nextStep = !bigBucket.value ? 'fill' : 'transfer';
    dispatch(setNextStep(nextStep));
  };
}

export function fill() {
  return (dispatch, getState) => {
    const { game: { buckets, steps: { log }, target } } = getState();
    const { big, small } = buckets;
    const { [small]: smallBucket } = buckets;
    const bucketToFill = smallBucket.size === target ? small : big;
    const otherBucket = bucketToFill === small ? big : small;
    const fullValue = buckets[bucketToFill].size;
    const newLog = [...log];
    newLog.push({ [bucketToFill]: fullValue, [otherBucket]: buckets[otherBucket].value });
    const payload = {
      buckets: { [bucketToFill]: { value: fullValue } },
      steps: { log: newLog },
    };
    dispatch({ type: types.FILL, payload });
    dispatch(trySetNextStep('transfer'));
  };
}

export function pauseGame() {
  return { type: types.PAUSE_GAME };
}

export function restartGame() {
  return { type: types.RESTART_GAME };
}

export function setBucketSize(bucketId, size) {
  return dispatch => {
    const { valid, validSize } = isSizeValid(size);
    if (!valid) return;
    dispatch({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: validSize, value: 0 } });
    dispatch(tryDisableGame());
  };
}

export function setTargetSize(size) {
  return dispatch => {
    const { valid, validSize } = isSizeValid(size);
    if (!valid) return;
    dispatch({ type: types.SET_TARGET_SIZE, payload: validSize });
    dispatch(tryDisableGame());
  };
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
    dispatch({ type: types.CLEAR_STEPS_LOG });
    dispatch({ type: types.START_STEPS, payload: _.merge({}, startStepsState, { buckets: { big, small } }) });
    dispatch(setNextStep('fill'));
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
    const nextStep = newSmallBucket.value === smallBucket.size ? 'dump' : (!newBigBucket.value ? 'fill' : 'transfer');
    dispatch({ type: types.TRANSFER, payload });
    dispatch(trySetNextStep(nextStep));
  };
}

function setNextStep(step) {
  return dispatch => {
    dispatch({ type: types.SET_NEXT_STEP, payload: step });
    setTimeout(() => dispatch({ type: types.SET_CURRENT_STEP }), 2000);
  };
}

function tryDisableGame() {
  return (dispatch, getState) => {
    const { game: { errorMessages: prevErrorMessages, play: { disabled } } } = getState();
    const invalidResults = validators.map(({ isValid }) => isValid(getState)).filter(({ valid }) => !valid);
    const errorMessages = invalidResults.map(({ errorMessage }) => errorMessage);
    const disable = !!invalidResults.length;
    if (disable !== disabled) dispatch({ type: types.DISABLE_GAME, payload: disable });
    if (!_.isEqual(errorMessages, prevErrorMessages)) dispatch({ type: types.SET_ERROR_MESSAGES, payload: errorMessages });
  };
}

function trySetNextStep(step) {
  return (dispatch, getState) => {
    const { game: { buckets: { left, right }, target } } = getState();
    if (left.value === target) dispatch({ type: types.LEFT_WINS });
    else if (right.value === target) dispatch({ type: types.RIGHT_WINS });
    else dispatch(setNextStep(step));
  };
}
