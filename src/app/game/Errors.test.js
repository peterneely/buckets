import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Game from './Game';
import Errors from './Errors';
import { mergeIntoInitialState } from './fakeStates';

describe('Errors', () => {
  it('Should render error messages', () => {
    const state = mergeIntoInitialState(() => ({ errorMessages: ['uh oh!'] }));
    const store = configureStore()(state);
    const game = shallow(<Game />, { context: { store } }).dive();
    const errors = game.find(Errors);
    expect(errors.length).toEqual(1);
    expect(errors.props().messages).toBeDefined();
    expect(errors.props().messages.length).not.toEqual(0);
  });
});
