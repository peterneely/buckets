import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Bucket from './Bucket';
import Game from './Game';
import TextField from 'material-ui/TextField';
import initialState, { fakeStoreStates } from './initialState';

const createBucket = ({ bucketId, actions }) => shallow(
  <Bucket
    actions={actions}
    id={bucketId}
    size={initialState[bucketId].size}
    value={initialState[bucketId].value}
  />
);

const createBucketsWhen = state => {
  const storeState = fakeStoreStates.mergeIntoInitial(() => state);
  const store = configureStore()(storeState);
  const game = shallow(<Game />, { context: { store } }).dive();
  return game.find(Bucket);
};

describe('Bucket', () => {
  ['left', 'right'].forEach(bucketId => {
    it('Should allow a user to set the size to a number', () => {
      const input = createBucket({ bucketId, actions: {} }).find(TextField);
      expect(input.length).toEqual(1);
      expect(input.props().type).toEqual("number");
    });

    it('Should dispatch the correct action when the size is changed', () => {
      const mockActions = { setBucketSize: jest.fn() };
      createBucket({ bucketId, actions: mockActions }).find(TextField).simulate('change');
      expect(mockActions.setBucketSize).toHaveBeenCalled();
    });

    it('Should disable the bucket size when the game is playing', () => {
      createBucketsWhen({ playing: true }).forEach(bucket => {
        expect(bucket.props().disabled).toBeTruthy();
      });
    });

    it('Should disable the bucket size when the game is paused', () => {
      createBucketsWhen({ paused: true }).forEach(bucket => {
        expect(bucket.props().disabled).toBeTruthy();
      });
    });
  });
});
