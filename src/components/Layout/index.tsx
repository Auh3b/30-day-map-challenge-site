import {
  Box,
  Divider,
  Grid2,
  Paper,
  Popper,
  Typography,
  useColorScheme,
} from '@mui/material';
import {
  Fragment,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import SingleModeSwitch from '@component/common/SingleModeSwitch';
import {
  DarkModeOutlined,
  InfoOutlined,
  LightModeOutlined,
} from '@mui/icons-material';

export default function index() {
  return (
    <Layout>
      <Header />
      <Content>
        <ThemeChanger />
        <DetailToggler />
      </Content>
      <Footer />
    </Layout>
  );
}

function Layout(props: PropsWithChildren) {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexWrap={'nowrap'}
      flexDirection={'column'}>
      {props.children}
    </Box>
  );
}

function ThemeChanger() {
  const { mode, setMode } = useColorScheme();
  const handleModeChange = useCallback(() => {
    if (!mode) return setMode('dark');

    if (mode === 'dark') {
      return setMode('light');
    }
    setMode('dark');
  }, [mode]);
  console.log(mode);
  return (
    <Box
      position={'absolute'}
      top={8}
      right={16}>
      <SingleModeSwitch
        title='mode'
        onClick={handleModeChange}>
        {mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
      </SingleModeSwitch>
    </Box>
  );
}

function DetailToggler() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Fragment>
      <Box
        position={'absolute'}
        top={8}
        left={16}>
        <SingleModeSwitch
          title='information'
          onClick={handleChange}>
          <InfoOutlined />
        </SingleModeSwitch>
      </Box>
      <Box
        position={'absolute'}
        top={72 * 0.75}
        left={16}>
        {isOpen && <MapDetails />}
      </Box>
    </Fragment>
  );
}

function MapDetails() {
  return (
    <Paper sx={{ p: 2 }}>
      <Grid2
        container
        direction={'column'}
        wrap='nowrap'>
        <Typography variant={'subtitle2'}>Point of Interest</Typography>
        <Typography color='primary'>Shops</Typography>
        <Divider
          sx={{ my: 1 }}
          flexItem
          orientation={'horizontal'}
        />
        <Typography variant={'subtitle2'}>Location</Typography>
        <Typography color='primary'>Lilongwe</Typography>
        <Divider
          sx={{ my: 1 }}
          flexItem
          orientation={'horizontal'}
        />
        <Typography variant={'subtitle2'}>Description</Typography>
        <Typography color='primary'>Shops within Lilongwe City</Typography>
        <Divider
          sx={{ my: 1 }}
          flexItem
          orientation={'horizontal'}
        />
        <Typography variant={'subtitle2'}>Sources</Typography>
        <Typography color='primary'>HDX</Typography>
      </Grid2>
    </Paper>
  );
}
