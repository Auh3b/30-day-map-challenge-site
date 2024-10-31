import { Box, useColorScheme } from '@mui/material';
import { Fragment, PropsWithChildren, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import SingleModeSwitch from '@components/common/SingleModeSwitch';
import {
  DarkModeOutlined,
  InfoOutlined,
  LightModeOutlined,
} from '@mui/icons-material';
import DayChallengeDetailsModal from '@components/UI/DayChallengeDetailsModal';
import usePageStore from '@storesusePageStore';

export default function index() {
  return (
    <Layout>
      <DayChallengeDetailsModal />
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
  return (
    <Box
      position={'absolute'}
      top={8}
      zIndex={100}
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
  const { welcomed, setWelcomed } = usePageStore((state) => state);
  const handleChange = () => {
    setWelcomed(!welcomed);
  };
  return (
    <Fragment>
      <Box
        position={'absolute'}
        top={8}
        zIndex={100}
        left={16}>
        <SingleModeSwitch
          title='information'
          onClick={handleChange}>
          <InfoOutlined />
        </SingleModeSwitch>
      </Box>
    </Fragment>
  );
}
