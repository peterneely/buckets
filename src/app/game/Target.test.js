import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import Target from './Target';

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
});