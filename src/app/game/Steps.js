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
    this.stepper.tryStep(nextProps);
  }

  stepper = (() => {
    const { actions } = this.props;
    const start = nextStep => nextStep ? actions[nextStep]() : actions.stepStart();
    return {
      tryStep: ({ paused, reset, started, steps: { next: nextStep } }) => {
        const { paused: prevPaused, reset: prevReset, steps: { next: prevStep } } = this.props;
        const { stepping } = this.state;
        const shouldStart = !stepping && started && !paused;
        const shouldPause = stepping && paused && paused !== prevPaused;
        const shouldReset = stepping && reset && reset !== prevReset;
        const shouldStep = stepping && nextStep && nextStep !== prevStep;
        if (shouldStart) this.setState({ stepping: true }, () => start(nextStep));
        else if (shouldPause || shouldReset) this.setState({ stepping: false });
        else if (shouldStep) actions[nextStep]();
      },
    };
  })();

  styles = {
    containerStyle: { width: 300 },
  };

  steps = (styles => {
    const { containerStyle } = styles;
    return {
      render: () => {
        const { steps: { log = [] } } = this.props;
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
                {log.map((step, index) => (
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
  steps: PropTypes.object.isRequired,
};

export default Steps;
