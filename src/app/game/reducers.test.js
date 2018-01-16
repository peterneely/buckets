import * as types from './types';
import reduce from './reducers';
import initialState from './initialState';

describe('Game configuration', () => {
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
});

describe('Game play', () => {
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

  it('Starts stepping correctly', () => {
    let action = { type: types.SET_BIG_SMALL_BUCKETS, payload: { big: 'right', small: 'left' } };
    expect(reduce({}, action)).toEqual({ buckets: { big: 'right', small: 'left' } });
    action = { type: types.START_STEPPING, payload: { log: [{ left: 0, right: 0 }], next: 'fill' } };
    expect(reduce({}, action)).toEqual({ steps: { log: [{ left: 0, right: 0 }], next: 'fill' } });
  });

  it('Resets game correctly', () => {
    const action = { type: types.RESET_GAME };
    expect(reduce({}, action)).toEqual(initialState);
  });
});

describe('Game steps', () => {
  it('Should fill the big bucket correctly when it is on the right', () => {
    const payload = {
      buckets: {
        right: { value: 5 },
      },
      steps: {
        log: [{ left: 0, right: 5 }],
        next: 'transfer',
      },
    };
    const action = { type: types.FILL, payload };
    expect(reduce({}, action)).toEqual(payload);
  });

  it('Should fill the big bucket correctly when it is on the left', () => {
    const payload = {
      buckets: {
        left: { value: 5 },
      },
      steps: {
        log: [{ left: 5, right: 0 }],
        next: 'transfer',
      },
    };
    const action = { type: types.FILL, payload };
    expect(reduce({}, action)).toEqual(payload);
  });
});

it('Returns the correct default state if no action is reduced', () => {
  const action = { type: types.NO_ACTION };
  expect(reduce({}, action)).toEqual({});
});
