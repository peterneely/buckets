/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Check from 'material-ui/svg-icons/action/check-circle';
import bucket from '_images/bucket.png';
import splash from '_images/splash.png';
import { animations, colors } from '_app/muiTheme';

class Bucket extends Component {
  state = { showValue: false, tip: false, value: 0, wins: false };

  componentWillReceiveProps(nextProps) {
    const { tryShowValue, tryTip, tryWin } = this.bucket;
    [tryShowValue, tryTip, tryWin].forEach(tryAction => tryAction(nextProps));
  }

  styles = (() => {
    const { style = {} } = this.props;
    const { transition, transitionSlow } = animations;
    const { bucket: { backgroundColor, water } } = colors;
    const minSize = 2;
    const maxSize = 6;
    return {
      create: () => {
        const { size, tipLeft, value } = this.props;
        const { showValue, tip } = this.state;
        const validSize = size > maxSize ? maxSize : (size < minSize ? minSize : size);
        const valueForHeight = value > maxSize ? maxSize : value; // (value < minSize ? minSize : value);
        const length = 40 + (validSize * 30);
        const height = (valueForHeight / validSize) * (length - 5);
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
            transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
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
            opacity: 0.5,
            position: 'absolute',
            transition: transitionSlow,
            width: '90%', // 115
            zIndex: 1,
          },
          waterTopStyle: {
            backgroundColor: water,
            borderRadius: '50%',
            height: 40 + (height * 0.2),
            // opacity: 0.5,
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
        const { disabled, size, tipLeft } = this.props;
        const { tip, value, wins } = this.state;
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
              {tipLeft ? (<img src={splash} alt="splash left" style={{
                height: 75,
                left: -45,
                opacity: tip ? 0.6 : 0,
                position: 'absolute',
                top: -5,
                transition: animations.transition,
                width: 75,
                zIndex: 6,
              }} />) : (<img src={splash} alt="splash right" style={{
                height: 75,
                right: -30,
                opacity: tip ? 0.6 : 0,
                position: 'absolute',
                top: -5,
                transform: 'scaleX(-1)',
                transition: animations.transition,
                width: 75,
                zIndex: 6,
              }} />)}
              <div style={{ opacity: wins ? 1 : 0, position: 'absolute', right: -4, top: -20, transition: animations.transition, zIndex: 10 }}>
                <Check color={colors.results.check} style={{ height: 48, width: 48 }} />
              </div>
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
      tryWin: ({ wins = false }) => {
        if (!wins && this.state.wins) this.setState({ wins: false });
        else if (wins && !this.state.wins) setTimeout(() => this.setState({ wins }), 600);
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
  tipLeft: PropTypes.bool,
  value: PropTypes.number.isRequired,
  wins: PropTypes.bool,
};

export default Bucket;
