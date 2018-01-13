import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Bucket extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <TextField
          defaultValue={1}
          floatingLabelText="Size"
          type="number"
        />
      </div>
    );
  }
}

Bucket.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Bucket;
