export const validators = [
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
];

function isEven(number) {
  return number % 2 === 0;
}

function isOdd(number) {
  return number % 2 === 1;
}
