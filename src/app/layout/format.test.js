import { toInt } from './format';

describe('toInt', () => {
  it('Should return an integer from a string', () => {
    expect(toInt('1')).toEqual(1);
  });

  it('Should return an integer from an integer', () => {
    expect(toInt(1)).toEqual(1);
  });
});
