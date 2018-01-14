import * as actionCreators from './actions';
import * as types from './types';
import { toInt } from '_layout/format';

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
      const action = actionCreators.setBucketSize(bucketId, size);
      expect(action).toEqual({ type: types.SET_BUCKET_SIZE, payload: { bucketId, size: toInt(size) } });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setBucketSize(bucketId, '1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });
});

describe('setTargetSize', () => {
  it('Should have a minimum size of 1', () => {
    const action = actionCreators.setTargetSize('0');
    expect(action).toEqual({ type: types.NO_ACTION });
  });

  it('Should allow the size to be increased', () => {
    ['2', '3', '4', '100'].forEach(size => {
      const action = actionCreators.setTargetSize(size);
      expect(action).toEqual({ type: types.SET_TARGET_SIZE, payload: toInt(size) });
    });
  });

  it('Should not allow decimals', () => {
    const action = actionCreators.setTargetSize('1.1');
    expect(action).toEqual({ type: types.NO_ACTION });
  });
});