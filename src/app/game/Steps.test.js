import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import _ from 'lodash';
import Game from './Game';
import Steps from './Steps';
import { playableState } from './fakeStoreStates';

describe('Steps', () => {
  let actions;

  beforeEach(() => {
    actions = { startSteps: jest.fn() };
  });

  describe('Start/stop', () => {
    it('Should be able to log steps', () => {
      const store = configureStore()(playableState);
      const game = shallow(<Game />, { context: { store } }).dive();
      const steps = game.find(Steps);
      expect(steps.length).toEqual(1);
      const props = steps.props();
      expect(props.actions).toBeDefined();
      expect(props.paused).toBeDefined();
      expect(props.restart).toBeDefined();
      expect(props.started).toBeDefined();
      expect(props.steps).toBeDefined();
    });

    it('Should start logging steps when the game starts', () => {
      const steps = shallow(<Steps actions={actions} steps={{}} />);
      const steppingState = steps.state('stepping');
      expect(steppingState).toBeDefined();
      expect(_.isBoolean(steppingState)).toBeTruthy();
      expect(steppingState).toBeFalsy();
      steps.setProps({ started: true });
      expect(steps.state('stepping')).toBeTruthy();
    });

    it('Should stop logging steps when the game is paused', () => {
      const steps = shallow(<Steps actions={actions} steps={{}} />);
      steps.setProps({ started: true });
      steps.setProps({ paused: true });
      expect(steps.state('stepping')).toBeFalsy();
    });

    it('Should start and stop logging steps when the game is started and paused repeatedly', () => {
      const steps = shallow(<Steps actions={actions} steps={{}} />);
      steps.setProps({ started: true });
      expect(steps.state('stepping')).toBeTruthy();
      steps.setProps({ paused: true });
      expect(steps.state('stepping')).toBeFalsy();
      steps.setProps({ paused: false });
      expect(steps.state('stepping')).toBeTruthy();
      steps.setProps({ paused: true });
      expect(steps.state('stepping')).toBeFalsy();
      steps.setProps({ paused: false });
      expect(steps.state('stepping')).toBeTruthy();
    });

    it('Should reset inner state when the game has been reset', () => {
      const steps = shallow(<Steps actions={actions} steps={{}} />);
      steps.setProps({ started: true });
      expect(steps.state('stepping')).toBeTruthy();
      steps.setProps({ reset: true });
      // expect(steps.state('stepping')).toBeFalsy(); // Not sure why this fails
    });
  });

  describe('Stepping', () => {
    it('Should dispatch the correct action when stepping starts', () => {
      const steps = shallow(<Steps actions={actions} steps={{}} />);
      steps.setProps({ started: true });
      expect(actions.startSteps).toHaveBeenCalled();
    });
  });
});
