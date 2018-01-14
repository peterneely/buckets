import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { toInt } from '_layout/format';

class Bucket extends Component {
  bucket = (() => {
    const { actions: { setBucketValue }, id } = this.props;
    const handleSetValue = event => setBucketValue(id, toInt(event.target.value));
    return {
      render: () => {
        const { value } = this.props;
        return (
          <div>
            <TextField
              floatingLabelText="Size"
              onChange={handleSetValue}
              type="number"
              value={value}
            />
          </div>
        );
      },
    };
  })();

  render() {
    return this.bucket.render();
  }
}

Bucket.propTypes = {
  actions: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bucket;
