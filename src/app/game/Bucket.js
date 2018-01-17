/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import bucket from '_images/bucket.png';
import splash from '_images/splash.png';
import { animations, colors } from '_app/muiTheme';

class Bucket extends Component {
  state = { rotate: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value < this.props.value && !this.state.rotate) this.setState({ rotate: true });
    if (nextProps.value >= this.props.value && this.state.rotate) this.setState({ rotate: false });
    if (nextProps.wins !== this.props.wins && this.state.rotate) this.setState({ rotate: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.stop && this.state.rotate) setTimeout(() => this.setState({ rotate: false }), 2000);
  }

  styles = (() => {
    const { style = {} } = this.props;
    const { transition, transitionSlow } = animations;
    const { bucket: { backgroundColor, water } } = colors;
    const minSize = 2;
    const maxSize = 6;
    return {
      create: () => {
        const { size, value } = this.props;
        const validSize = size > maxSize ? maxSize : (size < minSize ? minSize : size);
        const length = 40 + (validSize * 30);
        const height = (value / validSize) * (length - 5);
        const fontSize = (validSize * 6) + 5;
        return {
          containerStyle: {
            display: 'flex',
            flexDirection: 'column',
            ...style,
          },
          imageContainer: {
            backgroundColor,
            height: length,
            width: length,
            position: 'relative',
            transform: this.state.rotate ? 'rotate(-25deg)' : 'none',
            transition,
          },
          imageStyle: {
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: 2,
          },
          inputContainerStyle: {
            backgroundColor: 'white',
            textAlign: 'center',
            width: length,
            zIndex: 4,
          },
          inputStyle: {
            fontSize: 18,
            width: 100,
          },
          valueStyle: {
            bottom: 10,
            color: 'white',
            fontSize,
            fontWeight: 'bold',
            marginBottom: (validSize * 3) - 2,
            position: 'absolute',
            textAlign: 'center',
            width: '90%',
            zIndex: 3,
          },
          waterStyle: {
            backgroundColor: water,
            bottom: -2,
            height: height * 0.81,
            position: 'absolute',
            transition: transitionSlow,
            width: '90%', // 115
            zIndex: 1,
          },
          waterTopStyle: {
            backgroundColor: water,
            borderRadius: '50%',
            height: 40 + (height * 0.2),
            position: 'absolute',
            top: -12 - (height * 0.04),
            width: '100%', // 115
            zIndex: 2,
          },
        };
      },
    };
  })();

  bucket = (styles => {
    const { actions: { setBucketSize }, id } = this.props;
    const handleFocus = event => event.target.select();
    const handleSetSize = (event, newValue) => {
      setBucketSize(id, newValue);
      event && handleFocus(event);
    };
    return {
      render: () => {
        const { disabled, size, value } = this.props;
        const {
          containerStyle,
          imageContainer,
          imageStyle,
          inputContainerStyle,
          inputStyle,
          valueStyle,
          waterStyle,
          waterTopStyle,
        } = styles.create();
        return (
          <div style={containerStyle}>
            <div style={imageContainer}>
              <img src={splash} alt="splash" style={{
                height: 75,
                left: -45,
                opacity: this.state.rotate ? 1 : 0,
                position: 'absolute',
                top: -5,
                transition: animations.transition,
                width: 75,
                zIndex: 5,
              }} />
              <div style={waterStyle}>
                <div style={waterTopStyle} />
              </div>
              <img src={bucket} alt="bucket" style={imageStyle} />
              <div style={valueStyle}>
                {value}
              </div>
            </div>
            <div style={inputContainerStyle}>
              <TextField
                disabled={disabled}
                floatingLabelText="Size"
                onChange={handleSetSize}
                onFocus={handleFocus}
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
  stop: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
  wins: PropTypes.bool,
};

export default Bucket;
