import _ from 'lodash';
import * as types from './types';
import reduce from './reducers';
import initialState, { startStepsState } from './initialState';

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

  it('Restarts game correctly', () => {
    const action = { type: types.RESTART_GAME };
    expect(reduce({}, action)).toEqual(initialState);
  });
});

describe('Game steps', () => {
  it('Starts stepping correctly', () => {
    let action = { type: types.CLEAR_STEPS_LOG };
    expect(reduce({}, action)).toEqual({ steps: { log: [] } });
    const payload = _.merge({}, startStepsState, { buckets: { big: 'right', small: 'left' } });
    action = { type: types.START_STEPS, payload };
    expect(reduce({}, action)).toEqual(payload);
  });

  it('Should set the next step correctly', () => {
    const action = { type: types.SET_NEXT_STEP, payload: 'any' };
    expect(reduce({}, action)).toEqual({ steps: { next: 'any' } });
  });

  it('Should set the current step correctly', () => {
    const action = { type: types.SET_CURRENT_STEP };
    expect(reduce({ steps: { next: 'any' } }, action)).toEqual({ steps: { current: 'any', next: '', } });
  });

  it('Fills a bucket correctly', () => {
    const payload = {
      buckets: { right: { value: 5 } },
      steps: { log: [{ left: 0, right: 5 }] },
    };
    const action = { type: types.FILL, payload };
    expect(reduce({}, action)).toEqual(payload);
  });

  it('Transfers a bucket correctly', () => {
    const payload = {
      buckets: { left: { size: 3, value: 3 }, right: { size: 5, value: 2 } },
      steps: { log: [{ left: 3, right: 2 }] },
    };
    const action = { type: types.TRANSFER, payload };
    expect(reduce({}, action)).toEqual(payload);
  });

  it('Dumps the small bucket correctly', () => {
    const payload = {
      buckets: { left: { value: 0 } },
      steps: { log: [{ left: 0, right: 2 }] },
    };
    const action = { type: types.DUMP, payload };
    expect(reduce({ buckets: { left: {} } }, action)).toEqual(payload);
  });
});
