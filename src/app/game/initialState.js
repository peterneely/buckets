const initialState = {
  big: 'right',
  left: { size: 3, value: 0 },
  log: [],
  paused: false,
  playing: false,
  preventPlay: false,
  right: { size: 5, value: 0 },
  small: 'left',
  target: 4,
};

export const fakeStoreStates = {
  initial: addToGame(initialState),
  mergeIntoInitial: getState => addToGame({ ...initialState, ...getState(initialState) }),
  notPlayable: addToGame({
    ...initialState,
    left: { ...initialState.left, size: 2 },
    right: { ...initialState.right, size: 4 },
    target: 3,
  }),
  playable: addToGame({
    ...initialState,
    left: { ...initialState.left, size: 3 },
    right: { ...initialState.right, size: 5 },
    target: 4,
  }),
};

function addToGame(state) {
  return { game: { ...state } };
}

export default initialState;
