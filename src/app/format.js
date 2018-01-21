export function penultimate(array) {
  if (!array) return null;
  const { length } = array;
  if (!length) return null;
  const index = length >= 2 ? length - 2 : length - 1;
  return array[index];
}

export function toDecimalPlaces(decimalPlaces, value) {
  return parseFloat(parseFloat(value).toFixed(decimalPlaces));
}

export function toInt(value) {
  return value >>> 0;
}
