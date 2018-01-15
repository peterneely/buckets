import { notPlayableState } from './fakeStates';
import { preventPlay } from './play';

describe('preventPlay', () => {
  it('Returns true when two bucket sizes are even numbers and the target size is an odd number', () => {
    const { left, right, target } = notPlayableState.game;
    expect(preventPlay({ left, right, target })).toBeTruthy();
  });
});
