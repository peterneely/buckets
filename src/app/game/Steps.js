import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Steps extends Component {
  state = { stepping: false };

  componentWillReceiveProps(nextProps) {
    this.stepper.tryPause(nextProps);
    this.stepper.tryReset(nextProps);
    this.stepper.tryStart(nextProps);
  }

  styles = {
    containerStyle: { width: 300 },
  };

  stepper = (() => {
    const { actions: { startStepping } } = this.props;
    const pause = () => {
      this.setState({ stepping: false });
    };
    const start = () => {
      this.setState({ stepping: true });
      startStepping();
    };
    const stop = () => this.setState({ stepping: false });
    return {
      tryPause: ({ paused }) => {
        if (paused && paused !== this.props.paused && this.state.stepping) pause();
      },
      tryReset: ({ reset }) => {
        if (reset && reset !== this.props.reset && this.state.stepping) stop();
      },
      tryStart: ({ paused, started }) => {
        if (started && !paused && !this.state.stepping) start();
      },
    };
  })();

  steps = (styles => {
    const { containerStyle } = styles;
    return {
      render: () => {
        const { steps } = this.props;
        return (
          <div style={containerStyle}>
            <Table fixedHeader height="400">
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>{'Left'}</TableHeaderColumn>
                  <TableHeaderColumn>{'Right'}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {steps.map((step, index) => (
                  <TableRow key={index} striped>
                    <TableRowColumn>{step.left}</TableRowColumn>
                    <TableRowColumn>{step.right}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      },
    };
  })(this.styles);

  render() {
    return this.steps.render();
  }
}

Steps.propTypes = {
  actions: PropTypes.object.isRequired,
  paused: PropTypes.bool,
  reset: PropTypes.bool,
  started: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Steps;
