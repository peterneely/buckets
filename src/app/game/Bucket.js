import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import bucket from '_images/bucket.png';

class Bucket extends Component {
  styles = (() => {
    const { style = {} } = this.props;
    return {
      containerStyle: {
        backgroundImage: `url(${bucket})`,
        backgroundSize: 'cover',
        height: 125,
        width: 125,
        ...style,
      },
      inputStyle: { width: 100 },
    };
  })();

  bucket = (styles => {
    const { actions: { setBucketSize }, id } = this.props;
    const { containerStyle, inputStyle } = styles;
    const handleSetValue = (event, newValue) => setBucketSize(id, newValue);
    return {
      render: () => {
        const { disabled, size } = this.props;
        return (
          <div style={containerStyle}>
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
  })(this.styles);

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
