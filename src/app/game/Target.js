import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Target extends Component {
  target = (() => {
    const { actions: { setTargetSize }, style = {} } = this.props;
    const handleChange = (event, newValue) => setTargetSize(newValue);
    return {
      render: () => {
        const { value } = this.props;
        return (
          <div style={style}>
            <TextField
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
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
};

export default Target;
