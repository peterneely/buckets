import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300, lightBlue500, lightGreen50, lightGreen500, red50, red500 } from 'material-ui/styles/colors';

export const animations = {
  transition: 'all 0.3s ease',
  transitionSlow: 'all 1s ease',
};

export const colors = {
  bucket: {
    backgroundColor: grey300,
    water: lightBlue500,
  },
  errors: {
    backgroundColor: red50,
    color: red500,
  },
  results: {
    backgroundColor: lightGreen50,
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