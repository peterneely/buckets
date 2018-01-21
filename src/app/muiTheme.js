import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey100, grey300, lightBlue500, lightGreen500, red50, red500 } from 'material-ui/styles/colors';
import { lighten } from 'material-ui/utils/colorManipulator';

export const animations = {
  transition: 'all 0.3s ease',
  transitionSlow: 'all 1s ease',
};

export const colors = {
  bucket: {
    backgroundColor: grey300,
    waterColor: lightBlue500,
  },
  errors: {
    backgroundColor: red50,
    color: red500,
  },
  results: {
    checkColor: lightGreen500,
    countColor: lighten(lightBlue500, 0.5),
    headerBackgroundColor: grey100,
  },
};

export const elements = {
  border: `1px solid ${grey300}`,
  borderRadius: 4,
};

export default getMuiTheme({
  palette: {
    primary1Color: lightGreen500,
  },
});