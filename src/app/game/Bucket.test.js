import React from 'react';
import { shallow } from 'enzyme';
import Bucket from './Bucket';
import TextField from 'material-ui/TextField';

describe('Bucket', () => {
  let bucket;
  let input;

  beforeEach(() => {
    const actions = { setBucketValue: jest.fn() };
    bucket = shallow(<Bucket actions={actions} id="any" size={1} value={0} />);
    input = bucket.find(TextField);
  });

  it('Should allow a user to set the size', () => {
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("number");
  });

  it('Should have a minimum size of 1', () => {
    expect(bucket.instance().props.size).toEqual(1);
  });
});