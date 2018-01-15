import { nonPlayableState } from './fakeStates';
import { shouldDisableGame } from './play';

describe('shouldDisableGame', () => {
  it('Returns true when two bucket sizes are even numbers and the target size is an odd number', () => {
    const { buckets: { left, right }, target } = nonPlayableState.game;
    expect(shouldDisableGame({ left, right, target })).toBeTruthy();
  });
});
