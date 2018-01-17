export const validators = [
  {
    id: 'bucketsSameSize',
    isValid: getState => {
      const { game: { buckets: { left, right } } } = getState();
      return {
        valid: left.size !== right.size,
        errorMessage: 'Buckets cannot be the same size.',
      };
    },
  },
  {
    id: 'oddTargetEvenBuckets',
    isValid: getState => {
      const { game: { buckets: { left, right }, target } } = getState();
      return {
        valid: !(isEven(left.size) && isEven(right.size) && isOdd(target)),
        errorMessage: 'Two even bucket sizes cannot produce an odd target size.',
      };
    },
  },
  {
    id: 'targetTooBig',
    isValid: getState => {
      const { game: { buckets: { left, right }, target } } = getState();
      const biggest = left.size > right.size ? left.size : right.size;
      return {
        valid: target <= biggest,
        errorMessage: 'The target cannot be bigger than the biggest bucket.',
      };
    },
  },
];

function isEven(number) {
  return number % 2 === 0;
}

function isOdd(number) {
  return number % 2 === 1;
}
