import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Bucket extends Component {
  bucket = (() => {
    const { actions: { setBucketSize }, id, style = {} } = this.props;
    const handleSetValue = (event, newValue) => setBucketSize(id, newValue);
    return {
      render: () => {
        const { size } = this.props;
        return (
          <div style={style}>
            <TextField
              floatingLabelText="Size"
              onChange={handleSetValue}
              type="number"
              value={size}
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
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
};

export default Bucket;
