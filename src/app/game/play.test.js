import { preventPlay } from './play';
import { fakeStoreStates } from './initialState';

describe('preventPlay', () => {
  it('Returns true when two bucket sizes are even numbers and the target size is an odd number', () => {
    const { left, right, target } = fakeStoreStates.notPlayable.game;
    expect(preventPlay({ left, right, target })).toBeTruthy();
  });
});
