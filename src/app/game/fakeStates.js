import initialState from './initialState';

export const notPlayableState = addToGame({
  ...initialState,
  left: { ...initialState.left, size: 2 },
  right: { ...initialState.right, size: 4 },
  target: 3,
});

export const playableState = addToGame(initialState);

export function mergeIntoInitialState(getState) {
  return addToGame({ ...initialState, ...getState(initialState) });
}

function addToGame(state) {
  return { game: { ...state } };
}
