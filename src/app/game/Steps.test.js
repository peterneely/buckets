import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Game from './Game';
import Steps from './Steps';
import { playableState } from './fakeStoreStates';

describe('Steps', () => {
  it('Should be able to log steps', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    const steps = game.find(Steps);
    expect(steps.length).toEqual(1);
    const props = steps.props();
    expect(props.actions).toBeDefined();
    expect(props.paused).toBeDefined();
    expect(props.started).toBeDefined();
    expect(props.steps).toBeDefined();
  });

  it('Should start logging steps when the game starts', () => {
    const store = configureStore()(playableState);
    const game = shallow(<Game />, { context: { store } }).dive();
    const steps = game.find(Steps);
  });
});
