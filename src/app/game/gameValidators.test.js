import _ from 'lodash';
import { mergeIntoInitialState, nonPlayableState, playableState } from './fakeStates';
import { validators } from './gameValidators';

const getValidator = id => validators.find(validator => validator.id == id);

describe('Validators', () => {
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
    const getState = () => mergeIntoInitialState(() => ({ target: 6 }));
    expect(validator.isValid(getState).valid).toBeFalsy();
  });

  it('Should return true when the state is valid', () => {
    let getState = () => playableState;
    expect(validator.isValid(getState).valid).toBeTruthy();
    getState = () => mergeIntoInitialState(() => ({ target: 5 }));
    expect(validator.isValid(getState).valid).toBeTruthy();
  });
});
