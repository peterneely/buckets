import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as actionCreators from './actions';
import * as types from './types';
import { penultimate, toInt } from '_layout/format';
import { nonPlayableState, playableState } from './fakeStates';

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
  });

  it('Should enable game play if the target size is achievable', () => {
    const store = configureStore([thunk])(playableState);
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
  });

  it('Should enable game play if all validation rules pass', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.setTargetSize('4')); // Triggers the prevent play action, doesn't set the state
    expect(penultimate(store.getActions())).toEqual({ type: types.DISABLE_GAME, payload: false });
    expect(_.last(store.getActions())).toEqual({ type: types.SET_ERROR_MESSAGES, payload: [] });
  });
});