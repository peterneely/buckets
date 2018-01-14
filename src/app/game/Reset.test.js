import React from 'react';
import { shallow } from 'enzyme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Reset from './Reset';

describe('Reset', () => {
  let reset;
  let resetButton;

  beforeEach(() => {
    const actions = { resetGame: jest.fn() };
    reset = shallow(<Reset actions={actions} />);
    resetButton = reset.find(FloatingActionButton);
  });

  it('Should show a confirmation dialog when the reset button is pressed', () => {
    resetButton.simulate('click');
    expect(reset.instance().state.confirm).toBeTruthy();
  });
});