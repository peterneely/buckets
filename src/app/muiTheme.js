import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen500, red50, red500 } from 'material-ui/styles/colors';

export const animations = {
  transition: 'all 0.3s ease',
};

export const colors = {
  errors: {
    backgroundColor: red50,
    color: red500,
  },
};

export default getMuiTheme({
  palette: {
    primary1Color: lightGreen500,
  },
});