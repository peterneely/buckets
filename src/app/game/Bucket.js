import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Bucket extends Component {
  bucket = (() => {
    const { actions: { setBucketSize }, id, style = {} } = this.props;
    const inputStyle = { width: 100 };
    const handleSetValue = (event, newValue) => setBucketSize(id, newValue);
    return {
      render: () => {
        const { disabled, size } = this.props;
        return (
          <div style={style}>
            <TextField
              disabled={disabled}
              floatingLabelText="Size"
              onChange={handleSetValue}
              style={inputStyle}
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
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
};

export default Bucket;
