import 'App.css';
import Layout from '@component/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
