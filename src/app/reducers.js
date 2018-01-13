import initialState from './initialState';
import types from './types';

export default function reduce(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    default:
      return state;
  }
}
