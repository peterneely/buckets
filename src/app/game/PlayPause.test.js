import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as types from './types';
import Game from './Game';
import PlayPause from './PlayPause';
import { fakeStoreStates } from './initialState';

describe('Reset', () => {
  it('Should disable the play/pause button when the game state is the same as the initial game state', () => {
    const store = configureStore()(fakeStoreStates.initial);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should disable the play/pause button when the game state is not playable', () => {
    const state = fakeStoreStates.mergeIntoInitial(() => ({ preventPlay: true }));
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should enable the play/pause button when the game state is not the same as the initial game state', () => {
    const state = fakeStoreStates.mergeIntoInitial(initial => ({ target: initial.target + 1 }));
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should enable the play/pause button when the game state is playable', () => {
    const store = configureStore()(fakeStoreStates.playable);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should dispatch the correct action when Play is pressed', () => {
    const store = configureStore()(fakeStoreStates.initial);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.PLAY_GAME });
  });

  it('Should change the button icon to Pause when the game is playing', () => {
    const button = shallow(<PlayPause actions={{}} playing />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPause');
  });

  it('Should dispatch the correct action when Pause is pressed', () => {
    const state = fakeStoreStates.mergeIntoInitial(() => ({ playing: true }));
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.PAUSE_GAME });
  });

  it('Should change the button icon to Play when the game is not playing', () => {
    const button = shallow(<PlayPause actions={{}} playing={false} />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPlayArrow');
  });
});
