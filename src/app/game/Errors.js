import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { theme } from '_app/muiTheme';

class Errors extends Component {
  errors = (() => {
    const containerStyle = { backgroundColor: theme.palette.primary3Color, padding: 20, width: 275 };
    const messageStyle = { color: 'red', margin: '5px 5px 10px' };
    return {
      render: () => {
        const { messages } = this.props;
        return (
          <Paper style={containerStyle}>
            {messages.map(message => (
              <p key={message} style={messageStyle}>
                {message}
              </p>
            ))}
          </Paper>
        );
      },
    };
  })();

  render() {
    return this.errors.render();
  }
}

Errors.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Errors;