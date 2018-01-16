import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as types from './types';
import Game from './Game';
import PlayPause from './PlayPause';
import { mergeIntoInitialState, playableState } from './fakeStoreStates';

describe('Reset', () => {
  it('Should disable the play/pause button when the game state is not playable', () => {
    const state = mergeIntoInitialState({ play: { disabled: true } });
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeTruthy();
  });

  it('Should enable the play/pause button when the game state is not the same as the initial game state', () => {
    const state = mergeIntoInitialState(initialState => ({ target: initialState.target + 1 }));
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should enable the play/pause button when the game state is playable', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(PlayPause).props().disabled).toBeFalsy();
  });

  it('Should dispatch the correct action when Play is pressed initially', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.START_GAME });
  });

  it('Should change the button icon to Pause when the game has started', () => {
    const button = shallow(<PlayPause actions={{}} started />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPause');
  });

  it('Should dispatch the correct action when Pause is pressed', () => {
    const state = mergeIntoInitialState({ play: { started: true } });
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    game.find(PlayPause).dive().find(FloatingActionButton).simulate('click');
    expect(store.getActions()[0]).toEqual({ type: types.PAUSE_GAME });
  });

  it('Should change the button icon to Play when the game is not playing', () => {
    const button = shallow(<PlayPause actions={{}} />).find(FloatingActionButton);
    expect(button.props().children.type.displayName).toEqual('AvPlayArrow');
  });
});
