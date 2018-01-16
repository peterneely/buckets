import _ from 'lodash';
import initialState from './initialState';
import * as types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.DISABLE_GAME:
      return { ...state, play: { ...state.play, disabled: payload } };
    case types.FILL:
      return _.merge({}, state, payload);
    case types.PAUSE_GAME:
      return { ...state, play: { ...state.play, paused: true } };
    case types.RESET_GAME:
      return { ...initialState };
    case types.SET_BIG_SMALL_BUCKETS:
      return { ...state, buckets: { ...state.buckets, ...payload } };
    case types.SET_BUCKET_SIZE:
      return { ...state, buckets: { ...state.buckets, [payload.bucketId]: { ...state.buckets[payload.bucketId], size: payload.size } } };
    case types.SET_ERROR_MESSAGES:
      return { ...state, errorMessages: payload };
    case types.SET_NEXT_STEP:
      return { ...state, steps: { ...state.steps, next: payload } };
    case types.SET_TARGET_SIZE:
      return { ...state, target: payload };
    case types.START_GAME:
      return { ...state, play: { ...state.play, paused: false, started: true } };
    case types.START_STEPPING:
      return { ...state, steps: { ...state.steps, ...payload } };
    default:
      return state;
  }
}
