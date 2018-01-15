import * as types from './types';
import reduce from './reducers';
import initialState from './initialState';

it('Enables game play correctly', () => {
  const action = { type: types.DISABLE_GAME, payload: false };
  expect(reduce({}, action)).toEqual({ play: { disabled: false } });
});

it('Disables game play correctly', () => {
  const action = { type: types.DISABLE_GAME, payload: true };
  expect(reduce({}, action)).toEqual({ play: { disabled: true } });
});

it('Pauses game play correctly', () => {
  const action = { type: types.PAUSE_GAME };
  expect(reduce({}, action)).toEqual({ play: { paused: true } });
});

it('Starts game play correctly', () => {
  const action = { type: types.START_GAME };
  expect(reduce({}, action)).toEqual({ play: { paused: false, started: true } });
});

it('Resets game correctly', () => {
  const action = { type: types.RESET_GAME };
  expect(reduce({}, action)).toEqual(initialState);
});

it('Sets bucket size correctly', () => {
  ['left', 'right'].forEach(bucketId => {
    [1, 2, 3, 100].forEach(size => {
      const action = { type: types.SET_BUCKET_SIZE, payload: { bucketId, size } };
      expect(reduce({ buckets: {} }, action)).toEqual({ buckets: { [bucketId]: { size } } });
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

it('Sets error messages correctly', () => {
  const errorMessages = ['some error message', 'another error message'];
  const action = { type: types.SET_ERROR_MESSAGES, payload: errorMessages };
  expect(reduce({}, action)).toEqual({ errorMessages });
});

it('Clears error messages correctly', () => {
  const errorMessages = [];
  const action = { type: types.SET_ERROR_MESSAGES, payload: errorMessages };
  expect(reduce({}, action)).toEqual({ errorMessages });
});
