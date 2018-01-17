import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Redo from 'material-ui/svg-icons/content/redo';

class Reset extends Component {
  state = { confirm: false };

  dialog = (() => {
    const { actions: { resetGame } } = this.props;
    const contentStyle = { width: 400 };
    const handleClose = () => this.setState({ confirm: false });
    const handleReset = () => {
      handleClose();
      resetGame();
    };
    const buttons = [
      <FlatButton
        key="cancel"
        keyboardFocused
        label="Cancel"
        onClick={handleClose}
        primary
      />,
      <FlatButton
        key="reset"
        label="Reset"
        onClick={handleReset}
        primary
      />,
    ];
    return {
      render: () => (
        <Dialog
          actions={buttons}
          contentStyle={contentStyle}
          modal
          onRequestClose={handleClose}
          open={this.state.confirm}
          title="Reset game"
        >
          {'Reset the game to the default options?'}
        </Dialog>
      ),
    };
  })();

  button = (() => {
    const handleReset = () => this.setState({ confirm: true });
    return {
      render: () => {
        const { disabled, style = {} } = this.props;
        return (
          <div style={style}>
            <FloatingActionButton disabled={disabled} onClick={handleReset}>
              <Redo />
            </FloatingActionButton>
          </div>
        );
      },
    };
  })();

  render() {
    return (
      <div>
        {this.button.render()}
        {this.dialog.render()}
      </div>
    );
  }
}

Reset.propTypes = {
  actions: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default Reset;
