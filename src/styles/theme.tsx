import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: orange,
      },
    },
    light: {
      palette: {
        primary: orange,
      },
    },
  },
  typography: {
    h1: {
      fontFamily: 'Playfair Display',
    },
    h2: {
      fontFamily: 'Playfair Display',
    },
    h3: {
      fontFamily: 'Playfair Display',
    },
    h4: {
      fontFamily: 'Playfair Display',
    },
    h5: {
      fontFamily: 'Playfair Display',
    },
    h6: {
      fontFamily: 'Playfair Display',
    },
    subtitle1: {
      fontFamily: 'Playfair Display',
    },
    subtitle2: {
      fontFamily: 'Playfair Display',
    },
  },
});

export default theme;
