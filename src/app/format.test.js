import { toDecimalPlaces, toInt, penultimate } from './format';

describe('penultimate', () => {
  it('Should return the second to last item in an array or string of two or more items', () => {
    expect(penultimate([1, 2])).toEqual(1);
    expect(penultimate([1, 2, 3])).toEqual(2);
    expect(penultimate([1, 2, 3, 4, 5])).toEqual(4);
    expect(penultimate('12')).toEqual('1');
    expect(penultimate('123')).toEqual('2');
    expect(penultimate('12456789')).toEqual('8');
  });

  it('Should return the last item in an array or string if it only has one item', () => {
    expect(penultimate([1])).toEqual(1);
    expect(penultimate([2])).toEqual(2);
    expect(penultimate([3])).toEqual(3);
    expect(penultimate('1')).toEqual('1');
    expect(penultimate('2')).toEqual('2');
    expect(penultimate('3')).toEqual('3');
  });

  it('Should return null if the array or string is empty', () => {
    expect(penultimate([])).toBeNull();
    expect(penultimate('')).toBeNull();
  });

  it('Should return null if the array or string is null', () => {
    expect(penultimate(null)).toBeNull();
  });

  it('Should return null if the array or string is not an array or string', () => {
    expect(penultimate(123)).toBeNull();
    expect(penultimate(() => { })).toBeNull();
    expect(penultimate({})).toBeNull();
  });
});

describe('toDecimalPlaces', () => {
  it('Should return the correct number of decimals from a given number', () => {
    expect(toDecimalPlaces(3, 0.12345)).toEqual(0.123);
    expect(toDecimalPlaces(3, 1.12345)).toEqual(1.123);
    expect(toDecimalPlaces(3, 6.54321)).toEqual(6.543);
  });

  it('Should return the correct number of decimals from a given string number', () => {
    expect(toDecimalPlaces(3, '0.12345')).toEqual(0.123);
    expect(toDecimalPlaces(3, '1.12345')).toEqual(1.123);
    expect(toDecimalPlaces(3, '6.54321')).toEqual(6.543);
  });
});

describe('toInt', () => {
  it('Should return an integer from a string', () => {
    expect(toInt('1')).toEqual(1);
  });

  it('Should return an integer from an integer', () => {
    expect(toInt(1)).toEqual(1);
  });
});
