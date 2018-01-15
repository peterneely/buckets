export function shouldDisableGame({ left, right, target }) {
  return isEven(left.size) && isEven(right.size) && isOdd(target);
}

function isEven(number) {
  return number % 2 === 0;
}

function isOdd(number) {
  return number % 2 === 1;
}
