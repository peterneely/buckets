import { calcWaterUnits } from './bucketStyles';

const test = scenarios => {
  scenarios.forEach(({ size, value, expected }) => {
    expect(calcWaterUnits({ size, value })).toEqual(expected);
  });
};

describe('calcWaterUnits', () => {
  it('Should return the same units as the bucket size when buckets are size 3 and above and 6 and below', () => {
    test([
      { size: 3, value: 1, expected: 1 },
      { size: 3, value: 2, expected: 2 },
      { size: 3, value: 3, expected: 3 },
      { size: 4, value: 1, expected: 1 },
      { size: 4, value: 2, expected: 2 },
      { size: 4, value: 3, expected: 3 },
      { size: 4, value: 4, expected: 4 },
      { size: 5, value: 1, expected: 1 },
      { size: 5, value: 2, expected: 2 },
      { size: 5, value: 3, expected: 3 },
      { size: 5, value: 4, expected: 4 },
      { size: 5, value: 5, expected: 5 },
      { size: 6, value: 1, expected: 1 },
      { size: 6, value: 2, expected: 2 },
      { size: 6, value: 3, expected: 3 },
      { size: 6, value: 4, expected: 4 },
      { size: 6, value: 5, expected: 5 },
      { size: 6, value: 6, expected: 6 },
    ]);
  });

  it('Should limit the water units to size 3 when buckets are size 2 and below', () => {
    test([
      { size: 1, value: 1, expected: 3 },
      { size: 2, value: 1, expected: 1.5 },
      { size: 2, value: 2, expected: 3 },
    ]);
  });

  it('Should limit the water units to size 6 when buckets are size 7 and above', () => {
    test([
      { size: 7, value: 1, expected: 0.857 },
      { size: 7, value: 2, expected: 1.714 },
      { size: 7, value: 3, expected: 2.571 },
      { size: 7, value: 4, expected: 3.429 },
      { size: 7, value: 5, expected: 4.286 },
      { size: 7, value: 6, expected: 5.143 },
      { size: 7, value: 7, expected: 6 },
      { size: 9, value: 1, expected: 0.667 },
      { size: 9, value: 2, expected: 1.333 },
      { size: 9, value: 3, expected: 2 },
      { size: 9, value: 4, expected: 2.667 },
      { size: 9, value: 5, expected: 3.333 },
      { size: 9, value: 6, expected: 4 },
      { size: 9, value: 7, expected: 4.667 },
      { size: 9, value: 8, expected: 5.333 },
      { size: 9, value: 9, expected: 6 },
    ]);
  });
});