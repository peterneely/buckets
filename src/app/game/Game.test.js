import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Bucket from './Bucket';
import Game from './Game';
import PlayPause from './PlayPause';
import Restart from './Restart';
import Target from './Target';
import { playableState } from './fakeStoreStates';

describe('Game', () => {
  describe('Layout', () => {
    let game;

    beforeEach(() => {
      const store = configureStore()(playableState);
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

    it('Should have a play/pause button', () => {
      const button = game.find(PlayPause);
      expect(button.length).toEqual(1);
      expect(button.props().paused).toBeDefined();
      expect(button.props().started).toBeDefined();
    });

    it('Should have a restart button', () => {
      const button = game.find(Restart);
      expect(button.length).toEqual(1);
    });
  });
});
