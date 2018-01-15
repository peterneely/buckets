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
    const containerStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' };
    const rowStyle = { display: 'flex', justifyContent: 'center' };
    const elementContainerStyle = { margin: 30 };
    return {
      render: () => {
        const { game } = this.props;
        const { buckets: { left, right }, play: { disabled, paused, started }, target } = game;
        const isDefaultState = _.isEqual(game, initialState);
        const disableSize = started || paused;
        return (
          <div style={containerStyle}>
            <div style={rowStyle}>
              <Target
                actions={actions}
                disabled={disableSize}
                style={elementContainerStyle}
                value={target}
              />
            </div>
            <div style={rowStyle}>
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
            </div>
            <div style={rowStyle}>
              <PlayPause
                actions={actions}
                disabled={disabled}
                paused={paused}
                started={started}
                style={elementContainerStyle}
              />
              <Reset
                actions={actions}
                disabled={isDefaultState}
                style={elementContainerStyle}
              />
            </div>
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