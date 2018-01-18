/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import bucket from '_images/bucket.png';
import splash from '_images/splash.png';
import { animations, colors } from '_app/muiTheme';

class Bucket extends Component {
  state = { showValue: false, tip: false, value: 0 };

  componentWillReceiveProps(nextProps) {
    const { tryShowValue, tryTip } = this.bucket;
    [tryShowValue, tryTip].forEach(tryAction => tryAction(nextProps));
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
        const { showValue, tip } = this.state;
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
            transform: tip ? 'rotate(-25deg)' : 'none',
            transition,
          },
          imageStyle: {
            // border: '1px solid white',
            height: '100%',
            // position: 'absolute',
            width: '100%',
            // zIndex: 2,
          },
          inputContainerStyle: {
            backgroundColor: 'white',
            textAlign: 'center',
            width: length,
            zIndex: 5,
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
            opacity: showValue ? 1 : 0,
            position: 'absolute',
            textAlign: 'center',
            transition,
            width: '90%',
            zIndex: 4,
          },
          waterStyle: {
            backgroundColor: water,
            bottom: -2,
            height: height * 0.81,
            margin: '0 5px',
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
        const { disabled, size } = this.props;
        const { tip, value } = this.state;
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
                opacity: tip ? 1 : 0,
                position: 'absolute',
                top: -5,
                transition: animations.transition,
                width: 75,
                zIndex: 6,
              }} />
              <div style={waterStyle}>
                <div style={waterTopStyle} />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                width: '100%',
                zIndex: 3,
              }}>
                <img src={bucket} alt="bucket" style={imageStyle} />
                <div style={{
                  backgroundColor: 'white',
                  height: 100,
                  marginTop: -5,
                  width: '100%',
                }} />
              </div>
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
      tryShowValue: ({ value }) => {
        if (value === this.state.value) return;
        this.setState({ showValue: false }, () => {
          setTimeout(() => this.setState({ showValue: true, value }), 200);
        });
      },
      tryTip: ({ value }) => {
        if (value >= this.props.value) return;
        this.setState({ tip: true }, () => {
          setTimeout(() => this.setState({ tip: false }), 600);
        });
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
  wins: PropTypes.bool,
};

export default Bucket;
