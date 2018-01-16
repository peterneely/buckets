import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Game from './Game';
import Steps from './Steps';
import { playableState } from './fakeStates';

describe('Steps', () => {
  it('Should be able to log steps', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    const steps = game.find(Steps);
    expect(steps.length).toEqual(1);
    expect(steps.props().actions).toBeDefined();
    expect(steps.props().steps).toBeDefined();
  });
});
