import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import bucket from '_images/bucket.png';
import { animations, colors } from '_app/muiTheme';

class Bucket extends Component {
  styles = (() => {
    const { style = {} } = this.props;
    const { transitionSlow } = animations;
    const { bucket: { backgroundColor, water } } = colors;
    return {
      bucketStyle: {
        height: 125,
        position: 'absolute',
        width: 125,
        zIndex: 2,
      },
      containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        ...style,
      },
      getWaterStyle: () => {
        const { size, value } = this.props;
        return {
          backgroundColor: water,
          bottom: -2,
          height: (value / size) * 100,
          position: 'absolute',
          transition: transitionSlow,
          width: 115,
          zIndex: 1,
        };
      },
      imageContainer: {
        backgroundColor,
        height: 125,
        position: 'relative',
      },
      inputContainerStyle: {
        backgroundColor: 'white',
        textAlign: 'center',
        width: 125,
        zIndex: 99,
      },
      inputStyle: {
        width: 100,
      },
      waterTopStyle: {
        backgroundColor: water,
        borderRadius: '50%',
        height: 50,
        position: 'absolute',
        top: -12,
        width: 115,
        zIndex: 2,
      },
    };
  })();

  bucket = (styles => {
    const { actions: { setBucketSize }, id } = this.props;
    const {
      bucketStyle,
      containerStyle,
      getWaterStyle,
      imageContainer,
      inputContainerStyle,
      inputStyle,
      waterTopStyle,
    } = styles;
    const handleSetValue = (event, newValue) => setBucketSize(id, newValue);
    return {
      render: () => {
        const { disabled, size } = this.props;
        return (
          <div style={containerStyle}>
            <div style={imageContainer}>
              <div style={getWaterStyle()}>
                <div style={waterTopStyle} />
              </div>
              <img src={bucket} alt="bucket" style={bucketStyle} />
            </div>
            <div style={inputContainerStyle}>
              <TextField
                disabled={disabled}
                floatingLabelText="Size"
                onChange={handleSetValue}
                style={inputStyle}
                type="number"
                value={size}
              />
            </div>
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
