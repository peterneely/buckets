import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as gameActions from './actions';
import Bucket from './Bucket';
import Errors from './Errors';
import PlayPause from './PlayPause';
import Reset from './Reset';
import Steps from './Steps';
import Target from './Target';
import initialState from './initialState';

class Game extends Component {
  styles = {
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 400,
      justifyContent: 'center',
      width: '100%',
    },
    elementContainerStyle: { margin: 30 },
    rowStyle: { display: 'flex', justifyContent: 'center' },
  };

  game = (styles => {
    const { actions } = this.props;
    const { containerStyle, elementContainerStyle, rowStyle } = styles;
    return {
      render: () => {
        const { game } = this.props;
        const { buckets: { left, right }, errorMessages, play: { disabled, paused, started }, steps, target } = game;
        const disableInput = started || paused;
        const reset = _.isEqual(game, initialState);
        return (
          <div style={containerStyle}>
            <div style={rowStyle}>
              <Target
                actions={actions}
                disabled={disableInput}
                style={elementContainerStyle}
                value={target}
              />
            </div>
            <div style={rowStyle}>
              <Bucket
                actions={actions}
                disabled={disableInput}
                id="left"
                size={left.size}
                style={elementContainerStyle}
                value={left.value}
              />
              <Bucket
                actions={actions}
                disabled={disableInput}
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
                disabled={reset}
                style={elementContainerStyle}
              />
            </div>
            <div style={rowStyle}>
              <Errors messages={errorMessages} />
            </div>
            <div style={rowStyle}>
              <Steps
                actions={actions}
                paused={paused}
                reset={reset}
                started={started}
                steps={steps}
              />
            </div>
          </div>
        );
      },
    };
  })(this.styles);

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