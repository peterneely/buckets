import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Redo from 'material-ui/svg-icons/content/redo';

class Restart extends Component {
  state = { confirm: false };

  dialog = (() => {
    const { actions: { restartGame } } = this.props;
    const contentStyle = { width: 400 };
    const handleClose = () => this.setState({ confirm: false });
    const handleRestart = () => {
      handleClose();
      restartGame();
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
        key="restart"
        label="Restart"
        onClick={handleRestart}
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
          title="Restart game"
        >
          {'Are you sure you want to restart the game?'}
        </Dialog>
      ),
    };
  })();

  button = (() => {
    const handleRestart = () => this.setState({ confirm: true });
    return {
      render: () => {
        const { disabled, style = {} } = this.props;
        return (
          <div style={style}>
            <FloatingActionButton disabled={disabled} onClick={handleRestart}>
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

Restart.propTypes = {
  actions: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default Restart;
