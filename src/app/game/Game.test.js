import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Bucket from './Bucket';
import Game from './Game';
import Reset from './Reset';
import Target from './Target';
import initialState from '_store/initialState';

describe('Game', () => {
  describe('Layout', () => {
    let game;

    beforeEach(() => {
      const store = configureStore()(initialState);
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
      const button = game.find(Reset);
      expect(button.length).toEqual(1);
    });
  });
});
