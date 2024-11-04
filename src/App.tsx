import 'App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import useChallengeData from '@hooks/useChallengeData';

function App() {
  useChallengeData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
