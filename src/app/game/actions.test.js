import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as actionCreators from './actions';
import * as types from './types';
import { mergeIntoInitialState, nonPlayableState, playableState } from './fakeStoreStates';
import { penultimate, toInt } from '_app/format';
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

describe('restartGame', () => {
  it('Should dispatch the correct action', () => {
    expect(actionCreators.restartGame()).toEqual({ type: types.RESTART_GAME });
  });
});

describe('setBucketSize', () => {
  it('Should allow the size to be changed', () => {
    const bucketId = 'anyBucketId';
    ['2', '3', '100', '5'].forEach(size => {
      const store = configureStore([thunk])(playableState);
      store.dispatch(actionCreators.setBucketSize(bucketId, size));
      expect(store.getActions()[0]).toEqual({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: toInt(size), value: 0 } });
    });
  });

  it('Should set the value to 0 when the size is changed', () => {
    const bucketId = 'anyBucketId';
    ['2', '3', '4', '100'].forEach(size => {
      const store = configureStore([thunk])(playableState);
      store.dispatch(actionCreators.setBucketSize(bucketId, size));
      expect(store.getActions()[0]).toEqual({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: toInt(size), value: 0 } });
    });
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
  it('Should allow the size to be increased', () => {
    ['2', '3', '4', '100'].forEach(size => {
      const store = configureStore([thunk])(playableState);
      store.dispatch(actionCreators.setTargetSize(size));
      expect(store.getActions()[0]).toEqual({ type: types.SET_TARGET_SIZE, payload: toInt(size) });
    });
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
  it('Should be able to start stepping', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.startSteps());
    const payload = _.merge({}, startStepsState, { buckets: { big: 'right', small: 'left' } });
    const actions = store.getActions();
    expect(actions.length).toEqual(3);
    expect(actions[0]).toEqual({ type: types.CLEAR_STEPS_LOG });
    expect(actions[1]).toEqual({ type: types.START_STEPS, payload });
    expect(actions[2]).toEqual({ type: types.SET_NEXT_STEP, payload: 'fill' });
  });

  it('Should be able to fill the big bucket', () => {
    const store = configureStore([thunk])(playableState);
    store.dispatch(actionCreators.fill());
    const expectedPayload = {
      buckets: { right: { value: 5 } },
      steps: { log: [{ left: 0, right: 5 }] },
    };
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[0]).toEqual({ type: types.FILL, payload: expectedPayload });
    expect(actions[1]).toEqual({ type: types.SET_NEXT_STEP, payload: 'transfer' });
  });

  it('Should be able to fill the small bucket if it is the same size as the target', () => {
    const state = mergeIntoInitialState({ buckets: { left: { size: 4 } } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.fill());
    const expectedPayload = {
      buckets: { left: { value: 4 } },
      steps: { log: [{ left: 4, right: 0 }] },
    };
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[0]).toEqual({ type: types.FILL, payload: expectedPayload });
  });

  it('Should be able to transfer the big bucket to the small bucket', () => {
    const state = mergeIntoInitialState({ buckets: { right: { value: 5 } } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.transfer());
    const expectedPayload = {
      buckets: { left: { size: 3, value: 3 }, right: { size: 5, value: 2 } },
      steps: { log: [{ left: 3, right: 2 }] },
    };
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[0]).toEqual({ type: types.TRANSFER, payload: expectedPayload });
    expect(actions[1]).toEqual({ type: types.SET_NEXT_STEP, payload: 'dump' });
  });

  it('Should be able to dump the small bucket', () => {
    const state = mergeIntoInitialState({ buckets: { left: { value: 3 }, right: { value: 2 } } });
    const store = configureStore([thunk])(state);
    store.dispatch(actionCreators.dump());
    const expectedPayload = {
      buckets: { left: { value: 0 } },
      steps: { log: [{ left: 0, right: 2 }] },
    };
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[0]).toEqual({ type: types.DUMP, payload: expectedPayload });
    expect(actions[1]).toEqual({ type: types.SET_NEXT_STEP, payload: 'transfer' });
  });
});
