import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/FloatingActionButton';
import Redo from 'material-ui/svg-icons/content/redo';
import Bucket from './Bucket';
import Target from './Target';
import * as appActions from './actions';

class App extends Component {
  app = (() => {
    const { actions } = this.props;
    return {
      render: () => {
        const { app: { target } } = this.props;
        return (
          <div>
            <Bucket id="left" />
            <Bucket id="right" />
            <Target actions={actions} value={target} />
            <Button>
              <Redo />
            </Button>
          </div>
        );
      },
    };
  })();

  render() {
    return this.app.render();
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { app } = state;
  return { app };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(appActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);