import initialState from './initialState';
import * as types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.SET_TARGET:
      return { ...state, target: payload };
    default:
      return state;
  }
}
