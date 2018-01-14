import React from 'react';
import { shallow } from 'enzyme';
import Bucket from './Bucket';
import TextField from 'material-ui/TextField';
import initialState from '_store/initialState';

const { game: gameState } = initialState;
const createBucket = ({ bucketId, actions }) => shallow(
  <Bucket
    actions={actions}
    id={bucketId}
    size={gameState[bucketId].size}
    value={gameState[bucketId].value}
  />
);

describe('Bucket', () => {
  ['left', 'right'].forEach(bucketId => {
    it('Should allow a user to set the size to a number', () => {
      const input = createBucket({ bucketId, actions: {} }).find(TextField);
      expect(input.length).toEqual(1);
      expect(input.props().type).toEqual("number");
    });

    it('Should have the correct defaults', () => {
      const { size, value } = gameState[bucketId];
      expect(size).toEqual(1);
      expect(value).toEqual(0);
    });

    it('Should dispatch the correct action when the size is changed', () => {
      const mockActions = { setBucketSize: jest.fn() };
      createBucket({ bucketId, actions: mockActions }).find(TextField).simulate('change');
      expect(mockActions.setBucketSize).toHaveBeenCalled();
    });
  });
});
