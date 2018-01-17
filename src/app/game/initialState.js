export default {
  buckets: {
    big: 'right',
    left: { size: 3, value: 0 },
    right: { size: 5, value: 0 },
    small: 'left',
  },
  errorMessages: [],
  play: {
    disabled: false,
    leftWins: false,
    paused: false,
    rightWins: false,
    started: false,
  },
  steps: {
    log: [],
    current: '',
    next: '',
  },
  target: 4,
};

export const startStepsState = {
  buckets: {
    left: { value: 0 },
    right: { value: 0 },
  },
  play: {
    leftWins: false,
    rightWins: false,
  },
  steps: {
    log: [{ left: 0, right: 0 }],
  },
};
