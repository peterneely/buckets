import { transferBuckets } from './buckets';

describe('Transfer', () => {
  it('Should accept two buckets', () => {
    expect(transferBuckets.length).toEqual(2);
  });

  describe('Buckets are the same size', () => {
    it('Should transfer the correct units', () => {
      const scenarios = [
        {
          given: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 1, value: 1 },
          },
          expected: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 1, value: 1 },
          }
        },
        {
          given: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 1, value: 0 },
          },
          expected: {
            bucket1: { size: 1, value: 0 },
            bucket2: { size: 1, value: 1 },
          }
        },
        {
          given: {
            bucket1: { size: 3, value: 3 },
            bucket2: { size: 3, value: 1 },
          },
          expected: {
            bucket1: { size: 3, value: 1 },
            bucket2: { size: 3, value: 3 },
          }
        },
        {
          given: {
            bucket1: { size: 3, value: 2 },
            bucket2: { size: 3, value: 1 },
          },
          expected: {
            bucket1: { size: 3, value: 0 },
            bucket2: { size: 3, value: 3 },
          }
        },
        {
          given: {
            bucket1: { size: 5, value: 3 },
            bucket2: { size: 5, value: 1 },
          },
          expected: {
            bucket1: { size: 5, value: 0 },
            bucket2: { size: 5, value: 4 },
          }
        },
        {
          given: {
            bucket1: { size: 5, value: 5 },
            bucket2: { size: 5, value: 2 },
          },
          expected: {
            bucket1: { size: 5, value: 2 },
            bucket2: { size: 5, value: 5 },
          }
        },
      ];
      scenarios.forEach(({ given, expected }) => {
        const actual = transferBuckets(given.bucket1, given.bucket2);
        expect(actual.bucket1.value).toEqual(expected.bucket1.value);
        expect(actual.bucket2.value).toEqual(expected.bucket2.value);
      });
    });
  });

  describe('Bucket 1 is bigger', () => {
    it('Should transfer the correct units', () => {
      const scenarios = [
        {
          given: {
            bucket1: { size: 2, value: 2 },
            bucket2: { size: 1, value: 1 },
          },
          expected: {
            bucket1: { size: 2, value: 2 },
            bucket2: { size: 1, value: 1 },
          }
        },
        {
          given: {
            bucket1: { size: 2, value: 2 },
            bucket2: { size: 1, value: 0 },
          },
          expected: {
            bucket1: { size: 2, value: 1 },
            bucket2: { size: 1, value: 1 },
          }
        },
        {
          given: {
            bucket1: { size: 3, value: 3 },
            bucket2: { size: 2, value: 1 },
          },
          expected: {
            bucket1: { size: 3, value: 2 },
            bucket2: { size: 2, value: 2 },
          }
        },
        {
          given: {
            bucket1: { size: 5, value: 3 },
            bucket2: { size: 3, value: 2 },
          },
          expected: {
            bucket1: { size: 5, value: 2 },
            bucket2: { size: 3, value: 3 },
          }
        },
        {
          given: {
            bucket1: { size: 5, value: 0 },
            bucket2: { size: 3, value: 2 },
          },
          expected: {
            bucket1: { size: 5, value: 0 },
            bucket2: { size: 3, value: 2 },
          }
        },
        {
          given: {
            bucket1: { size: 5, value: 5 },
            bucket2: { size: 3, value: 0 },
          },
          expected: {
            bucket1: { size: 5, value: 2 },
            bucket2: { size: 3, value: 3 },
          }
        },
      ];
      scenarios.forEach(({ given, expected }) => {
        const actual = transferBuckets(given.bucket1, given.bucket2);
        expect(actual.bucket1.value).toEqual(expected.bucket1.value);
        expect(actual.bucket2.value).toEqual(expected.bucket2.value);
      });
    });
  });

  describe('Bucket 2 is bigger', () => {
    it('Should transfer the correct units', () => {
      const scenarios = [
        {
          given: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 2, value: 2 },
          },
          expected: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 2, value: 2 },
          }
        },
        {
          given: {
            bucket1: { size: 1, value: 0 },
            bucket2: { size: 2, value: 1 },
          },
          expected: {
            bucket1: { size: 1, value: 0 },
            bucket2: { size: 2, value: 1 },
          }
        },
        {
          given: {
            bucket1: { size: 1, value: 1 },
            bucket2: { size: 2, value: 1 },
          },
          expected: {
            bucket1: { size: 1, value: 0 },
            bucket2: { size: 2, value: 2 },
          }
        },
        {
          given: {
            bucket1: { size: 3, value: 2 },
            bucket2: { size: 5, value: 2 },
          },
          expected: {
            bucket1: { size: 3, value: 0 },
            bucket2: { size: 5, value: 4 },
          }
        },
        {
          given: {
            bucket1: { size: 3, value: 3 },
            bucket2: { size: 5, value: 2 },
          },
          expected: {
            bucket1: { size: 3, value: 0 },
            bucket2: { size: 5, value: 5 },
          }
        },
      ];
      scenarios.forEach(({ given, expected }) => {
        const actual = transferBuckets(given.bucket1, given.bucket2);
        expect(actual.bucket1.value).toEqual(expected.bucket1.value);
        expect(actual.bucket2.value).toEqual(expected.bucket2.value);
      });
    });
  });
});
