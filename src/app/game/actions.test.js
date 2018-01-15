import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as actionCreators from './actions';
import * as types from './types';
import { toInt } from '_layout/format';
import { notPlayableState, playableState } from './fakeStates';

describe('pauseGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.pauseGame()).toEqual({ type: types.PAUSE_GAME });
  });
});

describe('playGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.playGame()).toEqual({ type: types.PLAY_GAME });
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
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: toInt(size) } });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setBucketSize(bucketId, '1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should prevent game play if two bucket sizes are even numbers and the target size is an odd number', () => {
    const store = configureStore([thunk])(notPlayableState);
    store.dispatch(actionCreators.setBucketSize('right', '4')); // Triggers the prevent play action, doesn't set the state
    const actions = store.getActions();
    expect(_.last(actions)).toEqual({ type: types.PREVENT_PLAY });
  });

  it('Should enable game play if the target size is achievable', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.setBucketSize('right', '5')); // Triggers the prevent play action, doesn't set the state
    const actions = store.getActions();
    expect(_.last(actions)).toEqual({ type: types.ENABLE_PLAY });
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
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.SET_TARGET_SIZE, payload: toInt(size) });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setTargetSize('1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should prevent game play if two bucket sizes are even numbers and the target size is an odd number', () => {
    const store = configureStore([thunk])(notPlayableState);
    store.dispatch(actionCreators.setTargetSize('3')); // Triggers the prevent play action, doesn't set the state
    const actions = store.getActions();
    expect(_.last(actions)).toEqual({ type: types.PREVENT_PLAY });
  });

  it('Should enable game play if the target size is achievable', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.setTargetSize('4')); // Triggers the prevent play action, doesn't set the state
    const actions = store.getActions();
    expect(_.last(actions)).toEqual({ type: types.ENABLE_PLAY });
  });
});