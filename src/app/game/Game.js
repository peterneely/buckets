import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from './actions';
import Bucket from './Bucket';
import Errors from './Errors';
import PlayPause from './PlayPause';
import Restart from './Restart';
import Steps from './Steps';
import Target from './Target';

class Game extends Component {
  styles = (() => {
    const rowStyle = { alignItems: 'flex-end', display: 'flex', justifyContent: 'center' };
    return {
      buttonsContainerStyle: { ...rowStyle, marginBottom: 30, zIndex: 10 },
      containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 400,
        justifyContent: 'center',
        width: '100%',
      },
      elementContainerStyle: { margin: '30px 20px 0' },
      rowStyle,
    };
  })();

  game = (styles => {
    const { actions } = this.props;
    const { buttonsContainerStyle, containerStyle, elementContainerStyle, rowStyle } = styles;
    return {
      render: () => {
        const { game } = this.props;
        const {
          buckets: { big, left, right, small },
          errorMessages,
          play,
          steps,
          target,
        } = game;
        const { disabled, leftWins, paused, rightWins, started } = play;
        const disableInput = started || paused;
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
                isBig={big === 'left'}
                size={left.size}
                style={elementContainerStyle}
                tipLeft={small === 'left'}
                value={left.value}
                wins={leftWins && !!left.value}
              />
              <Bucket
                actions={actions}
                disabled={disableInput}
                id="right"
                isBig={big === 'right'}
                size={right.size}
                style={elementContainerStyle}
                tipLeft={big === 'right'}
                value={right.value}
                wins={rightWins && !!right.value}
              />
            </div>
            <div style={buttonsContainerStyle}>
              <PlayPause
                actions={actions}
                disabled={disabled}
                paused={paused}
                started={started}
                style={elementContainerStyle}
              />
              <Restart
                actions={actions}
                disabled={!started}
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
                play={play}
                restart={!started || leftWins || rightWins}
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