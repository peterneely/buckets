import React from 'react';
import { shallow } from 'enzyme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Reset from './Reset';

describe('Reset', () => {
  it('Should show a confirmation dialog when the reset button is pressed', () => {
    const actions = { resetGame: jest.fn() };
    const reset = shallow(<Reset actions={actions} />);
    reset.find(FloatingActionButton).simulate('click');
    expect(reset.instance().state.confirm).toBeTruthy();
  });
});
