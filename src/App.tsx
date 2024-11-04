import 'App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import useDayChallenge from '@hooks/useDayChallenge';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import useChallengeData from '@hooks/useChallengeData';

function App() {
  useChallengeData();
  const { setDayChallenge } = useDayChallenge();
  const currentDate = new Date('1 November, 2024');
  // const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  useEffect(() => {
    if (month < 10) return setDayChallenge(0);
    if (month > 10) return setDayChallenge(31);
    setDayChallenge(day);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
