import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bucket from './Bucket';
import Reset from './Reset';
import Target from './Target';
import * as gameActions from './actions';

class Game extends Component {
  game = (() => {
    const { actions } = this.props;
    return {
      render: () => {
        const { game: { left, right, target } } = this.props;
        return (
          <div>
            <Bucket actions={actions} id="left" size={left.size} value={left.value} />
            <Bucket actions={actions} id="right" size={right.size} value={right.value} />
            <Target actions={actions} value={target} />
            <Reset actions={actions} />
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