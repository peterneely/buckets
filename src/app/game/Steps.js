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
  styles = {
    containerStyle: { width: 300 },
  };

  steps = (styles => {
    const { containerStyle } = styles;
    return {
      render: () => {
        const { steps } = this.props;
        return (
          <div style={containerStyle}>
            <Table fixedHeader height={400}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>{'Left'}</TableHeaderColumn>
                  <TableHeaderColumn>{'Right'}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
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
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Steps;
