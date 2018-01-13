import React from 'react';
import { shallow } from 'enzyme';
import mockStore from 'redux-mock-store';
import Button from 'material-ui/FloatingActionButton';
import App from './App';
import Bucket from './Bucket';
import Target from './Target';
import initialState from '../store/initialState';
import * as types from './types';

describe('App', () => {
  let app;
  let store;

  beforeEach(() => {
    store = mockStore()(initialState);
    app = shallow(<App />, { context: { store } }).dive();
  });

  it('Should have a left bucket', () => {
    const bucket = app.find(Bucket).filterWhere(component => component.props().id === 'left');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a right bucket', () => {
    const bucket = app.find(Bucket).filterWhere(component => component.props().id === 'right');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a target', () => {
    const target = app.find(Target);
    expect(target.length).toEqual(1);
  });

  it('Should have a reset button', () => {
    const button = app.find(Button);
    expect(button.length).toEqual(1);
  });

  xit('Should reset the app state when the reset button is pressed', () => {
    createApp(store).find(Button).simulate('click');
    const action = store.getActions()[0];
    expect(action.type).toEqual(types.RESET_APP);
  });
});