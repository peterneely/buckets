import React from 'react';
import { shallow } from 'enzyme';
import Target from './Target';
import TextField from 'material-ui/TextField';

describe('Target', () => {
  it('Should allow a user to set the target size', () => {
    const wrapper = shallow(<Target />);
    const input = wrapper.find(TextField);
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("number");
  });

  it('Should have a minimum size of 1', () => {
    const wrapper = shallow(<Target />);
    const input = wrapper.find(TextField);
    expect(input.props().defaultValue).toEqual(1);
  });
});