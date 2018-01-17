import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as actionCreators from './actions';
import * as types from './types';
import { mergeIntoInitialState, nonPlayableState, playableState } from './fakeStoreStates';
import { penultimate, toInt } from '_layout/format';
import { startStepsState } from './initialState';

describe('pauseGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.pauseGame()).toEqual({ type: types.PAUSE_GAME });
  });
});

describe('startGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.startGame()).toEqual({ type: types.START_GAME });
  });
});

describe('resetGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.resetGame()).toEqual({ type: types.RESET_GAME });
  });
});

describe('setBucketSize', () => {
  const bucketId = 'anyBucketId';

  it('Should have a minimum size of 1', () => {
    const action = actionCreators.setBucketSize(bucketId, '0');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should allow the size to be increased', () => {
    ['2', '3', '4', '100'].forEach(size => {
      const store = configureStore([thunk])(playableState);
      store.dispatch(actionCreators.setBucketSize(bucketId, size));
      expect(store.getActions()[0]).toEqual({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: toInt(size) } });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setBucketSize(bucketId, '1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should disable game play if two bucket sizes are even numbers and the target size is an odd number', () => {
    const store = configureStore([thunk])(nonPlayableState);
    store.dispatch(actionCreators.setBucketSize('right', '4')); // Triggers the prevent play action, doesn't set the state
    expect(penultimate(store.getActions())).toEqual({ type: types.DISABLE_GAME, payload: true });
  });

  it('Should set an error message for each validation rules that fails', () => {
    const store = configureStore([thunk])(nonPlayableState);
    store.dispatch(actionCreators.setBucketSize('right', '4')); // Triggers the prevent play action, doesn't set the state
    const action = _.last(store.getActions());
    expect(action.type).toEqual(types.SET_ERROR_MESSAGES);
    expect(action.payload.length).not.toEqual(0);
    expect(_.isString(action.payload[0])).toBeTruthy();
  });

  it('Should enable game play if the target size is achievable', () => {
    const state = mergeIntoInitialState({ errorMessages: ['something terrible happened'], play: { disabled: true } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.setBucketSize('right', '5')); // Triggers the prevent play action, doesn't set the state
    expect(penultimate(store.getActions())).toEqual({ type: types.DISABLE_GAME, payload: false });
    expect(_.last(store.getActions())).toEqual({ type: types.SET_ERROR_MESSAGES, payload: [] });
  });
});

describe('setTargetSize', () => {
  it('Should have a minimum size of 1', () => {
    const action = actionCreators.setTargetSize('0');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should allow the size to be increased', () => {
    ['2', '3', '4', '100'].forEach(size => {
      const store = configureStore([thunk])(playableState);
      store.dispatch(actionCreators.setTargetSize(size));
      expect(store.getActions()[0]).toEqual({ type: types.SET_TARGET_SIZE, payload: toInt(size) });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setTargetSize('1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should disable game play if any validation rule fails', () => {
    const store = configureStore([thunk])(nonPlayableState);
    store.dispatch(actionCreators.setTargetSize('3')); // Triggers the prevent play action, doesn't set the state
    expect(penultimate(store.getActions())).toEqual({ type: types.DISABLE_GAME, payload: true });
  });

  it('Should set an error message for each validation rules that fails', () => {
    const store = configureStore([thunk])(nonPlayableState);
    store.dispatch(actionCreators.setTargetSize('3')); // Triggers the prevent play action, doesn't set the state
    const action = _.last(store.getActions());
    expect(action.type).toEqual(types.SET_ERROR_MESSAGES);
    expect(action.payload.length).not.toEqual(0);
    expect(_.isString(action.payload[0])).toBeTruthy();
  });

  it('Should enable game play if all validation rules pass', () => {
    const state = mergeIntoInitialState({ errorMessages: ['something terrible happened'], play: { disabled: true } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.setTargetSize('4')); // Triggers the prevent play action, doesn't set the state
    expect(penultimate(store.getActions())).toEqual({ type: types.DISABLE_GAME, payload: false });
    expect(_.last(store.getActions())).toEqual({ type: types.SET_ERROR_MESSAGES, payload: [] });
  });
});

describe('Stepping', () => {
  beforeEach(jest.useFakeTimers);

  it('Should be able to start stepping', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.startSteps());
    const actions = store.getActions();
    const payload = _.merge({}, startStepsState, { buckets: { big: 'right', small: 'left' } });
    expect(actions.length).toEqual(2);
    expect(actions[0]).toEqual({ type: types.CLEAR_STEPS_LOG });
    expect(actions[1]).toEqual({ type: types.START_STEPS, payload });
    expect(setTimeout).toHaveBeenCalledTimes(1); // setNextStep
  });

  it('Should be able to fill the big bucket', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.fill());
    const expectedPayload = {
      buckets: { right: { value: 5 } },
      steps: { log: [{ left: 0, right: 5 }] },
    };
    expect(store.getActions()[0]).toEqual({ type: types.FILL, payload: expectedPayload });
    expect(setTimeout).toHaveBeenCalledTimes(1); // setNextStep
  });

  it('Should be able to transfer the big bucket to the little bucket', () => {
    const state = mergeIntoInitialState({ buckets: { right: { value: 5 } } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.transfer());
    const expectedPayload = {
      buckets: { left: { size: 3, value: 3 }, right: { size: 5, value: 2 } },
      steps: { log: [{ left: 3, right: 2 }] },
    };
    expect(store.getActions()[0]).toEqual({ type: types.TRANSFER, payload: expectedPayload });
    expect(setTimeout).toHaveBeenCalledTimes(1); // setNextStep
  });
});
