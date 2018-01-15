import * as types from './types';
import initialState from './initialState';
import reduce from './reducers';

it('Pauses the game correctly', () => {
  const action = { type: types.PAUSE_GAME };
  expect(reduce({}, action)).toEqual({ paused: true, playing: false });
});

it('Plays the game correctly', () => {
  const action = { type: types.PLAY_GAME };
  expect(reduce({}, action)).toEqual({ playing: true });
});

it('Resets game correctly', () => {
  const action = { type: types.RESET_GAME };
  expect(reduce({}, action)).toEqual(initialState);
});

it('Sets bucket size correctly', () => {
  ['left', 'right'].forEach(bucketId => {
    [1, 2, 3, 100].forEach(size => {
      const action = { type: types.SET_BUCKET_SIZE, payload: { bucketId, size } };
      expect(reduce({}, action)).toEqual({ [bucketId]: { size } });
    });
  });
});

it('Sets target size correctly', () => {
  [1, 2, 3, 100].forEach(size => {
    const action = { type: types.SET_TARGET_SIZE, payload: size };
    expect(reduce({}, action)).toEqual({ target: size });
  });
});

it('Returns the correct default state if no action is reduced', () => {
  const action = { type: types.NO_ACTION };
  expect(reduce({}, action)).toEqual({});
});
