import _ from 'lodash';
import { isSizeValid, validators } from './gameValidators';
import { mergeIntoInitialState, nonPlayableState, playableState } from './fakeStoreStates';
import { toInt } from '_app/format';

const getValidator = id => validators.find(validator => validator.id == id);

describe('isSizeValid', () => {
  it('Returns true and the valid number when the size is a number that is 1 or greater', () => {
    ['1', '2', '10'].forEach(size => {
      const { valid, validSize } = isSizeValid(size);
      expect(valid).toBeTruthy();
      expect(validSize).toEqual(toInt(size));
    });
  });

  it('Returns false when the size is less than 1', () => {
    ['0', '-1'].forEach(size => {
      const { valid, validSize } = isSizeValid(size);
      expect(valid).toBeFalsy();
      expect(validSize).toBeNull();
    });
  });

  it('Returns false when the size contains a decimal', () => {
    ['1.1', '2.1'].forEach(size => {
      const { valid, validSize } = isSizeValid(size);
      expect(valid).toBeFalsy();
      expect(validSize).toBeNull();
    });
  });

  it('Returns false when the size contains a non-numeric character', () => {
    ['a', 'b', '@', '$', '~'].forEach(size => {
      const { valid, validSize } = isSizeValid(size);
      expect(valid).toBeFalsy();
      expect(validSize).toBeNull();
    });
  });
});

describe('validators', () => {
  it('Should export a non-empty array of validator objects', () => {
    expect(validators).toBeDefined();
    expect(_.isArray(validators)).toBeTruthy();
    expect(validators.length).toBeTruthy();
  });

  it('Each validator should have the correct properties filled in', () => {
    const getState = () => playableState;
    _.forEach(validators, ({ id, isValid }) => {
      expect(_.isString(id)).toBeTruthy();
      expect(id.length).toBeTruthy();
      expect(_.isFunction(isValid)).toBeTruthy();
      const { valid, errorMessage } = isValid(getState);
      expect(_.isBoolean(valid)).toBeTruthy();
      expect(_.isString(errorMessage)).toBeTruthy();
      expect(errorMessage.length).toBeTruthy();
    });
  });
});

describe('bucketsHalfSize', () => {
  const validator = getValidator('bucketsHalfSize');

  it('Should return false when the state is not valid', () => {
    const getState = () => mergeIntoInitialState({ buckets: { left: { size: 3 }, right: { size: 6 } } });
    expect(validator.isValid(getState).valid).toBeFalsy();
  });

  it('Should return true when the state is valid', () => {
    const getState = () => mergeIntoInitialState({ buckets: { left: { size: 3 }, right: { size: 7 } } });
    expect(validator.isValid(getState).valid).toBeTruthy();
  });
});

describe('bucketsSameSize', () => {
  const validator = getValidator('bucketsSameSize');

  it('Should return false when the state is not valid', () => {
    const getState = () => mergeIntoInitialState({ buckets: { left: { size: 5 } } });
    expect(validator.isValid(getState).valid).toBeFalsy();
  });

  it('Should return true when the state is valid', () => {
    const getState = () => mergeIntoInitialState(initialState => ({ buckets: { left: { size: initialState.buckets.right.size - 1 } } }));
    expect(validator.isValid(getState).valid).toBeTruthy();
  });
});

describe('oddTargetEvenBuckets', () => {
  const validator = getValidator('oddTargetEvenBuckets');

  it('Should return false when the state is not valid', () => {
    const getState = () => nonPlayableState;
    expect(validator.isValid(getState).valid).toBeFalsy();
  });

  it('Should return true when the state is valid', () => {
    const getState = () => playableState;
    expect(validator.isValid(getState).valid).toBeTruthy();
  });
});

describe('targetTooBig', () => {
  const validator = getValidator('targetTooBig');

  it('Should return false when the state is not valid', () => {
    const getState = () => mergeIntoInitialState({ target: 6 });
    expect(validator.isValid(getState).valid).toBeFalsy();
  });

  it('Should return true when the state is valid', () => {
    const getState = () => mergeIntoInitialState({ target: 5 });
    expect(validator.isValid(getState).valid).toBeTruthy();
  });
});
