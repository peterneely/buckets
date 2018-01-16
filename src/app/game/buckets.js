export function transferBuckets(bucket1, bucket2) {
  const { value: value1 } = bucket1;
  const { size: size2, value: value2 } = bucket2;
  const space2 = size2 - value2;
  const xfer = space2 > value1 ? value1 : space2;
  return {
    bucket1: { ...bucket1, value: value1 - xfer },
    bucket2: { ...bucket2, value: value2 + xfer },
  };
}