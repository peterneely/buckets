import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Target extends Component {
  target = (() => {
    const { actions: { setTargetSize }, style = {} } = this.props;
    const handleChange = (event, newValue) => setTargetSize(newValue);
    return {
      render: () => {
        const { disabled, value } = this.props;
        return (
          <div style={style}>
            <TextField
              disabled={disabled}
              floatingLabelText="Size"
              onChange={handleChange}
              type="number"
              value={value}
            />
          </div>
        );
      },
    };
  })();

  render() {
    return this.target.render();
  }
}

Target.propTypes = {
  actions: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
};

export default Target;
