import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
// import Pause from 'material-ui/svg-icons/av/pause';

class PlayPause extends Component {
  button = (() => {
    const handlePlayPause = () => { };
    return {
      render: () => {
        const { disabled, style = {} } = this.props;
        return (
          <div style={style}>
            <FloatingActionButton disabled={disabled} onClick={handlePlayPause}>
              <Play />
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
  style: PropTypes.object,
};

export default PlayPause;
