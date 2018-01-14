import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { toInt } from '_layout/format';

class Target extends Component {
  target = (() => {
    const { actions: { setTarget } } = this.props;
    const handleChange = event => setTarget(toInt(event.target.value));
    return {
      render: () => {
        const { value } = this.props;
        return (
          <div>
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
  value: PropTypes.number.isRequired,
};

export default Target;
