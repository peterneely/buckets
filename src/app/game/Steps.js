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
import { animations, colors, elements } from '_app/muiTheme';

class Steps extends Component {
  state = { stepping: false };

  componentWillReceiveProps(nextProps) {
    this.stepper.tryStep(nextProps);
  }

  stepper = (() => {
    const { actions } = this.props;
    const start = currentStep => currentStep ? actions[currentStep]() : actions.startSteps();
    return {
      tryStep: ({ play: { started }, paused, restart, steps: { current: currentStep } }) => {
        const { paused: prevPaused, restart: prevRestart, steps: { current: prevCurrentStep } } = this.props;
        const { stepping } = this.state;
        const shouldStart = !stepping && started && !paused;
        const shouldPause = stepping && paused && paused !== prevPaused;
        const canRestart = restart && restart !== prevRestart;
        const shouldStep = stepping && currentStep && currentStep !== prevCurrentStep;
        if (shouldStart) this.setState({ stepping: true }, () => start(currentStep));
        else if (shouldPause || canRestart) this.setState({ stepping: false });
        else if (shouldStep) actions[currentStep]();
      },
    };
  })();

  styles = (() => {
    const { transition } = animations;
    const { results: { backgroundColor } } = colors;
    const { border, borderRadius } = elements;
    return {
      columnStyle: { fontSize: 16, textAlign: 'center' },
      getContainerStyle: () => {
        const { play: { leftWins, rightWins, started } } = this.props;
        const show = started || leftWins || rightWins;
        return {
          border,
          borderRadius,
          height: show ? 'inherit' : 0,
          opacity: show ? 1 : 0,
          transition,
          width: 300,
        };
      },
      headerStyle: { backgroundColor },
      tableStyle: { borderRadius },
    };
  })();

  steps = (styles => {
    const { columnStyle, getContainerStyle, headerStyle, tableStyle } = styles;
    return {
      render: () => {
        const { steps: { log = [] } } = this.props;
        return (
          <div style={getContainerStyle()}>
            <Table fixedHeader height="230px" style={tableStyle}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={headerStyle}>
                <TableRow>
                  <TableHeaderColumn style={columnStyle}>{'Left'}</TableHeaderColumn>
                  <TableHeaderColumn style={columnStyle}>{'Right'}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {log.map((step, index) => (
                  <TableRow key={index}>
                    <TableRowColumn style={columnStyle}>{step.left}</TableRowColumn>
                    <TableRowColumn style={columnStyle}>{step.right}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div >
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
  play: PropTypes.object.isRequired,
  restart: PropTypes.bool,
  steps: PropTypes.object.isRequired,
};

export default Steps;
