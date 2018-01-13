import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class Target extends Component {
  render() {
    return (
      <div>
        <TextField
          defaultValue={1}
          floatingLabelText="Size"
          type="number"
        />
      </div>
    );
  }
}

export default Target;
