import React from 'react';
import { shallow } from 'enzyme';
import Bucket from './Bucket';
import TextField from 'material-ui/TextField';

describe('Bucket', () => {
  it('Should allow a user to set the size', () => {
    const wrapper = shallow(<Bucket id="any" />);
    const input = wrapper.find(TextField);
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("number");
  });

  it('Should have a minimum size of 1', () => {
    const wrapper = shallow(<Bucket id="any" />);
    const input = wrapper.find(TextField);
    expect(input.props().defaultValue).toEqual(1);
  });
});