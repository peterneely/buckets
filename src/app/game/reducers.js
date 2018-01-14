import initialState from './initialState';
import * as types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.RESET_GAME:
      return { ...initialState };
    case types.SET_BUCKET_SIZE:
      return { ...state, [payload.bucketId]: { ...state[payload.bucketId], size: payload.size } };
    case types.SET_TARGET_SIZE:
      return { ...state, target: payload };
    default:
      return state;
  }
}
