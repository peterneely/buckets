import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as types from './types';
import Game from './Game';
import PlayPause from './PlayPause';
import initialState from '_store/initialState';

describe('Reset', () => {
  it('Should disable the play/pause button when the game state is the same as the initial game state', () => {
    const store = configureStore()(initialState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should disable the play/pause button when the game state is not playable', () => {
    const preventPlayState = { game: { ...initialState.game, preventPlay: true } };
    const store = configureStore()(preventPlayState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should enable the play/pause button when the game state is not the same as the initial game state', () => {
    const dirtyState = { game: { ...initialState.game, target: initialState.game.target + 1 } };
    const store = configureStore()(dirtyState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should enable the play/pause button when the game state is playable', () => {
    const playableState = {
      game: {
        ...initialState.game,
        left: { ...initialState.game.left, size: 3 },
        preventPlay: false,
        right: { ...initialState.game.right, size: 5 },
        target: 4,
      },
    };
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should dispatch the correct action when Play is pressed', () => {
    const store = configureStore()(initialState);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.PLAY_GAME });
  });

  it('Should change the button icon to Pause when the game is playing', () => {
    const button = shallow(<PlayPause actions={{}} playing />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPause');
  });

  it('Should dispatch the correct action when Pause is pressed', () => {
    const playingState = { game: { ...initialState.game, playing: true } };
    const store = configureStore()(playingState);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.PAUSE_GAME });
  });

  it('Should change the button icon to Play when the game is not playing', () => {
    const button = shallow(<PlayPause actions={{}} playing={false} />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPlayArrow');
  });
});
