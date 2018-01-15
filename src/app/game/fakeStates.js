import _ from 'lodash';
import initialState from './initialState';

export const nonPlayableState = addToGame({
  ...initialState,
  buckets: {
    ...initialState.buckets,
    left: { ...initialState.buckets.left, size: 2 },
    right: { ...initialState.buckets.right, size: 4 },
  },
  target: 3,
});

export const playableState = addToGame(initialState);

export function mergeIntoInitialState(getState) {
  return addToGame(_.merge({}, initialState, getState(initialState)));
}

function addToGame(state) {
  return { game: { ...state } };
}
