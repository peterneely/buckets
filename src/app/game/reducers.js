import _ from 'lodash';
import initialState, { restartStepsState } from './initialState';
import * as types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.CLEAR_STEPS_LOG:
      return { ...state, steps: { ...state.steps, log: [] } };
    case types.DISABLE_GAME:
      return { ...state, play: { ...state.play, disabled: payload } };
    case types.DUMP:
    case types.FILL:
    case types.START_STEPS:
    case types.TRANSFER:
      return _.merge({}, state, payload);
    case types.LEFT_WINS:
      return { ...state, play: { ...state.play, leftWins: true, started: false }, steps: { ...state.steps, current: '' } };
    case types.PAUSE_GAME:
      return { ...state, play: { ...state.play, paused: true } };
    case types.RESTART_GAME:
      return _.merge({}, state, restartStepsState);
    case types.RIGHT_WINS:
      return { ...state, play: { ...state.play, rightWins: true, started: false }, steps: { ...state.steps, current: '' } };
    case types.SET_BUCKET_SIZE:
      return { ...state, buckets: { ...state.buckets, [payload.bucketId]: { ...state.buckets[payload.bucketId], size: payload.size, value: 0 } } };
    case types.SET_CURRENT_STEP:
      return { ...state, steps: { ...state.steps, current: state.steps.next, next: '' } };
    case types.SET_ERROR_MESSAGES:
      return { ...state, errorMessages: payload };
    case types.SET_NEXT_STEP:
      return { ...state, steps: { ...state.steps, next: payload } };
    case types.SET_TARGET_SIZE:
      return { ...state, target: payload };
    case types.START_GAME:
      return { ...state, play: { ...state.play, paused: false, started: true } };
    default:
      return state;
  }
}
