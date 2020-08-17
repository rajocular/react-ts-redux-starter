import { createMuiTheme } from '@material-ui/core/styles';

// Add more colors here if needed
export const COLORS = {
  primary: {
    main: '#0F8AF9'
  },
  secondary: {
    main: '#2E516D'
  }
};

export const theme = createMuiTheme({
  palette: COLORS
  // Add more options here if needed
});
