import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Game from './Game';
import Restart from './Restart';
import { mergeIntoInitialState, playableState } from './fakeStoreStates';

describe('Reset', () => {
  it('Should disable the restart button when the game has not started', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(Restart).props().disabled).toBeTruthy();
  });

  it('Should enable the restart button when the game has started', () => {
    const state = mergeIntoInitialState({ play: { started: true } });
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    expect(game.find(Restart).props().disabled).toBeFalsy();
  });

  it('Should show a confirmation dialog when the restart button is pressed', () => {
    const actions = { restartGame: jest.fn() };
    const restart = shallow(<Restart actions={actions} />);
    restart.find(FloatingActionButton).simulate('click');
    expect(restart.instance().state.confirm).toBeTruthy();
  });
});
