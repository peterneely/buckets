import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bucket extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>{id}</div>
    );
  }
}

Bucket.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Bucket;
