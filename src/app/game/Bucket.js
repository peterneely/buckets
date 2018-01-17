import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import bucket from '_images/bucket.png';
import { colors } from '_app/muiTheme';

class Bucket extends Component {
  styles = (() => {
    const { style = {} } = this.props;
    const { bucket: { water } } = colors;
    return {
      containerStyle: { display: 'flex', flexDirection: 'column', ...style },
      bucketStyle: { position: 'absolute', height: 125, width: 125, zIndex: 2 },
      imageContainer: { position: 'relative' },
      inputStyle: { width: 100 },
      waterStyle: { backgroundColor: water, height: 50, position: 'absolute', top: 70, width: 100, zIndex: 1 },
    };
  })();

  bucket = (styles => {
    const { actions: { setBucketSize }, id } = this.props;
    const { bucketStyle, containerStyle, imageContainer, inputStyle, waterStyle } = styles;
    const handleSetValue = (event, newValue) => setBucketSize(id, newValue);
    return {
      render: () => {
        const { disabled, size } = this.props;
        return (
          <div style={containerStyle}>
            <div style={imageContainer}>
              <div style={waterStyle} />
              <img src={bucket} alt="bucket" style={bucketStyle} />
            </div>
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
