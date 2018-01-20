/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Check from 'material-ui/svg-icons/action/check-circle';
import bucket from '_images/bucket.png';
import splash from '_images/splash.png';
import createStyles from './bucketStyles';

const delays = { short: 200, long: 600 };

class Bucket extends Component {
  state = { showValue: false, tip: false, value: 0, wins: false };

  componentWillReceiveProps(nextProps) {
    const { tryShowValue, tryTip, tryWin } = this.bucket;
    [tryShowValue, tryTip, tryWin].forEach(tryAction => tryAction(nextProps));
  }

  bucket = (() => {
    const { actions: { setBucketSize }, id } = this.props;
    const handleFocus = event => event.target.select();
    const handleSetSize = (event, newValue) => {
      setBucketSize(id, newValue);
      event && handleFocus(event);
    };
    return {
      render: () => {
        const { disabled, size, tipLeft } = this.props;
        const styles = createStyles(this);
        return (
          <div style={styles.containerStyle}>
            <div style={styles.imageContainer}>
              <img src={splash} alt="splash" style={tipLeft ? styles.splashLeft : styles.splashRight} />
              <Check color={styles.checkColor} style={styles.check} />
              <div style={styles.waterStyle}>
                <div style={styles.waterTopStyle} />
              </div>
              <div style={styles.bucketContainer}>
                <img src={bucket} alt="bucket" style={styles.imageStyle} />
                <div style={styles.bucketCover} />
              </div>
              <div style={styles.valueStyle}>
                {this.state.value}
              </div>
            </div>
            <div style={styles.inputContainerStyle}>
              <TextField
                disabled={disabled}
                floatingLabelText="Size"
                onChange={handleSetSize}
                onFocus={handleFocus}
                style={styles.inputStyle}
                type="number"
                value={size}
              />
            </div>
          </div>
        );
      },
      tryShowValue: ({ value }) => {
        if (value !== this.state.value) this.setState({ showValue: false }, () => {
          setTimeout(() => this.setState({ showValue: true, value }), delays.short);
        });
      },
      tryTip: ({ value }) => {
        if (value < this.props.value) this.setState({ tip: true }, () => {
          setTimeout(() => this.setState({ tip: false }), delays.long);
        });
      },
      tryWin: ({ wins = false }) => {
        if (!wins && this.state.wins) this.setState({ wins: false });
        else if (wins && !this.state.wins) setTimeout(() => this.setState({ wins }), delays.long);
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
  tipLeft: PropTypes.bool,
  value: PropTypes.number.isRequired,
  wins: PropTypes.bool,
};

export default Bucket;
