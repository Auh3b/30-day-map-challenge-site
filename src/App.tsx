import 'App.css';
import Layout from '@components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import useDayChallenge from '@hooks/useDayChallenge';

function App() {
  const { setDayChallenge } = useDayChallenge();
  const currentDate = new Date(Date.now());
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
      <Layout />
    </ThemeProvider>
  );
}

export default App;
