import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Game from './Game';
import TextField from 'material-ui/TextField';
import Target from './Target';
import { mergeIntoInitialState } from './fakeStates';

const createTargetWhen = state => {
  const storeState = mergeIntoInitialState(() => state);
  const store = configureStore()(storeState);
  const game = shallow(<Game />, { context: { store } }).dive();
  return game.find(Target);
};

describe('Target', () => {
  let mockActions;
  let input;

  beforeEach(() => {
    mockActions = { setTargetSize: jest.fn() };
    input = shallow(<Target actions={mockActions} value={1} />).find(TextField);
  });

  it('Should allow a user to set the target size to a number', () => {
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("number");
  });

  it('Should have the correct default', () => {
    expect(input.props().value).toEqual(1);
  });

  it('Should dispatch the correct action when the size is changed', () => {
    input.simulate('change');
    expect(mockActions.setTargetSize).toHaveBeenCalled();
  });

  it('Should disable the target size when the game is playing', () => {
    expect(createTargetWhen({ playing: true }).props().disabled).toBeTruthy();
  });

  it('Should disable the target size when the game is paused', () => {
    expect(createTargetWhen({ paused: true }).props().disabled).toBeTruthy();
  });
});