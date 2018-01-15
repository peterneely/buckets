import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';

class PlayPause extends Component {
  button = (() => {
    const { actions: { pauseGame, playGame } } = this.props;
    const handlePlayPause = playing => () => playing ? pauseGame() : playGame();
    return {
      render: () => {
        const { disabled, playing, style = {} } = this.props;
        return (
          <div style={style}>
            <FloatingActionButton disabled={disabled} onClick={handlePlayPause(playing)}>
              {playing ? <Pause /> : <Play />}
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
  playing: PropTypes.bool,
  style: PropTypes.object,
};

export default PlayPause;
