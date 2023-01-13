import { createTheme } from '@mui/material';
const palette = {
  primary: {
    main: '#fff',
    light: '#7F8C88', // Grey 700
    dark: '#34423E', // Grey 900
  },
  secondary: {
    main: '#000', // Black
  },
};

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
  },
  components: {},
  palette: palette,
});
