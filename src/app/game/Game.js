import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as gameActions from './actions';
import Bucket from './Bucket';
import PlayPause from './PlayPause';
import Reset from './Reset';
import Target from './Target';
import initialState from './initialState';

class Game extends Component {
  game = (() => {
    const { actions } = this.props;
    const containerStyle = { display: 'flex', justifyContent: 'center', width: '100%' };
    const elementContainerStyle = { margin: 30 };
    return {
      render: () => {
        const { game } = this.props;
        const { left, paused, playing, preventPlay, right, target } = game;
        const isDefaultState = _.isEqual(game, initialState);
        const disableSize = playing || paused;
        return (
          <div style={containerStyle}>
            <Bucket
              actions={actions}
              disabled={disableSize}
              id="left"
              size={left.size}
              style={elementContainerStyle}
              value={left.value}
            />
            <Bucket
              actions={actions}
              disabled={disableSize}
              id="right"
              size={right.size}
              style={elementContainerStyle}
              value={right.value}
            />
            <Target
              actions={actions}
              disabled={disableSize}
              style={elementContainerStyle}
              value={target}
            />
            <PlayPause
              actions={actions}
              disabled={preventPlay}
              playing={playing}
              style={elementContainerStyle}
            />
            <Reset
              actions={actions}
              disabled={isDefaultState}
              style={elementContainerStyle}
            />
          </div>
        );
      },
    };
  })();

  render() {
    return this.game.render();
  }
}

Game.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { game } = state;
  return { game };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(gameActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);