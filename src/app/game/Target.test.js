import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import Target from './Target';

describe('Target', () => {
  let actions;
  let input;

  beforeEach(() => {
    actions = { setTarget: jest.fn() };
    input = shallow(<Target actions={actions} value={1} />).find(TextField);
  });

  it('Should allow a user to set the target size', () => {
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual("number");
  });

  it('Should have a minimum size of 1', () => {
    expect(input.props().value).toEqual(1);
  });

  it('Should update the state when the value changes', () => {
    input.simulate('change', { target: { value: 2 } });
    expect(actions.setTarget).toHaveBeenCalled();
    expect(actions.setTarget.mock.calls[0]).toEqual([2]);
  });
});