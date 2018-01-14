import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResetButton from 'material-ui/FloatingActionButton';
import Redo from 'material-ui/svg-icons/content/redo';
import Bucket from './Bucket';
import Target from './Target';
import * as gameActions from './actions';

class Game extends Component {
  game = (() => {
    const { actions } = this.props;
    const { resetGame: handleReset } = actions;
    return {
      render: () => {
        const { game: { left, right, target } } = this.props;
        return (
          <div>
            <Bucket actions={actions} id="left" size={left.size} value={left.value} />
            <Bucket actions={actions} id="right" size={right.size} value={right.value} />
            <Target actions={actions} value={target} />
            <ResetButton onClick={handleReset}>
              <Redo />
            </ResetButton>
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