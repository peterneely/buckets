import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen500, red50 } from 'material-ui/styles/colors';

export const theme = {
  palette: {
    primary1Color: lightGreen500,
    primary3Color: red50,
  }
};

export default getMuiTheme(theme);