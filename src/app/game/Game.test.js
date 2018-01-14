import React from 'react';
import configureStore from 'redux-mock-store';
// import { createStore } from 'redux';
import { shallow } from 'enzyme';
// import * as actions from './actions';
import Bucket from './Bucket';
import Game from './Game';
import Reset from './Reset';
import Target from './Target';
import initialState from '_store/initialState';
// import rootReducer from '_store/reducers';

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

  // describe('Behavior', () => {
  //   let game;
  //   let store;

  //   beforeEach(() => {
  //     store = createStore(rootReducer, initialState);
  //     game = shallow(<Game />, { context: { store } }).dive();
  //   });

  //   it('Should enable the reset button when the game state is not the same as the initial game state', () => {
  //     store.dispatch(actions.setTarget(initialState.game.target + 1));
  //     expect(store.getState()).not.toEqual(initialState);
  //     expect(game.find(Reset).props().disabled).toBeTruthy();
  //   });

  //   it('Should disable the reset button when the game state is the same as the initial game state', () => {
  //     const reset = game.find(Reset);
  //     expect(reset.props().disabled).toBeTruthy();
  //     store.dispatch(actions.setTarget(initialState.game.target + 1));
  //     expect(store.getState()).not.toEqual(initialState);
  //     store.dispatch(actions.setTarget(initialState.game.target));
  //     expect(store.getState()).toEqual(initialState);
  //     expect(reset.props().disabled).toBeTruthy();
  //   });
  // });
});
