import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Game from './Game';
import PlayPause from './PlayPause';
import initialState from '_store/initialState';

describe('Reset', () => {
  it('Should disable the play/pause button when the game state is the same as the initial game state', () => {
    const store = configureStore()(initialState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should enable the play/pause button when the game state is not the same as the initial game state', () => {
    const changedState = { game: { ...initialState.game, target: initialState.game.target + 1 } };
    const store = configureStore()(changedState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });
});
