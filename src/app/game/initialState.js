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
    next: '',
  },
  target: 4,
};
