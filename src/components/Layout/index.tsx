import { Box } from '@mui/material';
import { Fragment, PropsWithChildren } from 'react';
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
import { Outlet } from 'react-router-dom';
import useMapThemeScheme from '@hooks/useMapThemeScheme';
import Legend from '@components/common/Map/Legend';
import useChallengeData from '@hooks/useChallengeData';
import ToolbarContainer from '@components/common/Map/customMapControls/ToolbarContainer';
import ZoomToLayer from '@components/common/Map/customMapControls/ZoomToLayer';

export default function index() {
  useChallengeData();
  return (
    <Layout>
      <DayChallengeDetailsModal />
      <Header />
      <Content>
        <MapToolbarLeft />
        <MapToolbarRight />
        <LegendUI />
        <Outlet />
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
  const { mode, getThemeChanger } = useMapThemeScheme();
  const handleChange = getThemeChanger();
  return (
    <Box
      position={'absolute'}
      top={8}
      zIndex={100}
      right={16}>
      <SingleModeSwitch
        title='mode'
        onClick={handleChange}>
        {mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
      </SingleModeSwitch>
    </Box>
  );
}

function MapToolbarLeft() {
  return (
    <ToolbarContainer>
      <DetailToggler />
      <ZoomToLayer />
    </ToolbarContainer>
  );
}

function MapToolbarRight() {
  return (
    <ToolbarContainer placement={'top-right'}>
      <ThemeChanger />
    </ToolbarContainer>
  );
}

function DetailToggler() {
  const { welcomed, setWelcomed } = usePageStore((state) => state);
  const handleChange = () => {
    setWelcomed(!welcomed);
  };
  return (
    <SingleModeSwitch
      title='information'
      onClick={handleChange}>
      <InfoOutlined />
    </SingleModeSwitch>
  );
}

function LegendUI() {
  return (
    <Box
      maxWidth={(theme) => theme.spacing(30)}
      position={'absolute'}
      bottom={8}
      zIndex={100}
      right={16}>
      <Legend />
    </Box>
  );
}
