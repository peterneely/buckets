import initialState from './initialState';
import * as types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.RESET_GAME:
      return { ...initialState };
    case types.SET_BUCKET_VALUE:
      return { ...state, [payload.id]: { ...state[payload.id], value: payload.value } };
    case types.SET_TARGET:
      return { ...state, target: payload };
    default:
      return state;
  }
}
