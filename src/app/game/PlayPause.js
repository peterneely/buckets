import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';

class PlayPause extends Component {
  button = (() => {
    const { actions: { pauseGame, startGame } } = this.props;
    const handlePlayPause = start => () => start ? startGame() : pauseGame();
    return {
      render: () => {
        const { disabled, paused, started, style = {} } = this.props;
        const start = !started || paused;
        return (
          <div style={style}>
            <FloatingActionButton disabled={disabled} onClick={handlePlayPause(start)}>
              {start ? <Play /> : <Pause />}
            </FloatingActionButton>
          </div>
        );
      },
    };
  })();

  render() {
    return this.button.render();
  }
}

PlayPause.propTypes = {
  actions: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  paused: PropTypes.bool,
  started: PropTypes.bool,
  style: PropTypes.object,
};

export default PlayPause;
