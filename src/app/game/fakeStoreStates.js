import _ from 'lodash';
import initialState from './initialState';

export const mergeIntoInitialState = state => addStoreKey(_.merge({}, initialState, _.isFunction(state) ? state(initialState) : state));

export const nonPlayableState = mergeIntoInitialState({ buckets: { left: { size: 2 }, right: { size: 4 } }, target: 3 });

export const playableState = addStoreKey(initialState);

export const altPlayableState = mergeIntoInitialState({ buckets: { big: 'left', left: { size: 5 }, right: { size: 3 }, small: 'right' } });

function addStoreKey(state) {
  return { game: { ...state } };
}
