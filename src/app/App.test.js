import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Bucket from './Bucket';
import Target from './Target';

describe('App', () => {
  it('Should have a left bucket', () => {
    const wrapper = shallow(<App />);
    const bucket = wrapper.find(Bucket).filterWhere(component => component.props().id === 'left');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a right bucket', () => {
    const wrapper = shallow(<App />);
    const bucket = wrapper.find(Bucket).filterWhere(component => component.props().id === 'right');
    expect(bucket.length).toEqual(1);
  });

  it('Should have a target', () => {
    const wrapper = shallow(<App />);
    const target = wrapper.find(Target);
    expect(target.length).toEqual(1);
  });
});