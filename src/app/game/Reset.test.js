import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Game from './Game';
import Reset from './Reset';
import initialState from '_store/initialState';

describe('Reset', () => {
  it('Should disable the reset button when the game state is the same as the initial game state', () => {
    const store = configureStore()(initialState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(Reset).props().disabled).toBeTruthy();
  });

  it('Should enable the reset button when the game state is not the same as the initial game state', () => {
    const changedState = { game: { ...initialState.game, target: initialState.game.target + 1 } };
    const store = configureStore()(changedState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(Reset).props().disabled).toBeFalsy();
  });

  it('Should show a confirmation dialog when the reset button is enabled and pressed', () => {
    const actions = { resetGame: jest.fn() };
    const reset = shallow(<Reset actions={actions} />);
    reset.find(FloatingActionButton).simulate('click');
    expect(reset.instance().state.confirm).toBeTruthy();
  });
});
