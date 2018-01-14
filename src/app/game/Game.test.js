import React from 'react';
import { shallow } from 'enzyme';
import mockStore from 'redux-mock-store';
import Button from 'material-ui/FloatingActionButton';
import Game from './Game';
import Bucket from './Bucket';
import Target from './Target';
import initialState from '_store/initialState';
import * as types from './types';

describe('Game', () => {
  let game;
  let store;

  beforeEach(() => {
    store = mockStore()(initialState);
    game = shallow(<Game />, { context: { store } }).dive();
  });

  it('Should have a left bucket', () => {
    const bucket = game.find(Bucket).filterWhere(component => component.props().id === 'left');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a right bucket', () => {
    const bucket = game.find(Bucket).filterWhere(component => component.props().id === 'right');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a target', () => {
    const target = game.find(Target);
    expect(target.length).toEqual(1);
  });

  it('Should have a reset button', () => {
    const button = game.find(Button);
    expect(button.length).toEqual(1);
  });

  it('Should reset the game state when the reset button is pressed', () => {
    game.find(Button).simulate('click');
    const action = store.getActions()[0];
    expect(action.type).toEqual(types.RESET_GAME);
  });
});