import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { animations, colors } from '_app/muiTheme';

class Errors extends Component {
  styles = (() => {
    const { errors: { backgroundColor, color } } = colors;
    const { transition } = animations;
    return {
      contentStyle: { backgroundColor, padding: 20, width: 290 },
      getContainerStyle: ({ show }) => ({ height: show ? 'inherit' : 0, opacity: show ? 1 : 0, transition }),
      textStyle: { color, margin: 0, padding: '5px 8px 10px' },
    };
  })();

  errors = (styles => {
    const { contentStyle, getContainerStyle, textStyle } = styles;
    return {
      render: () => {
        const { messages } = this.props;
        return (
          <div style={getContainerStyle({ show: !!messages.length })}>
            <Paper style={contentStyle}>
              {messages.map(message => (
                <p key={message} style={textStyle}>
                  {message}
                </p>
              ))}
            </Paper>
          </div>
        );
      },
    };
  })(this.styles);

  render() {
    return this.errors.render();
  }
}

Errors.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Errors;