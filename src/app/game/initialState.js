const initialState = {
  left: { size: 1, value: 0 },
  log: [],
  playing: false,
  preventPlay: false,
  paused: false,
  right: { size: 1, value: 0 },
  target: 1,
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
