import { Box } from '@mui/material';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getLayers from 'layers';
import useMapStore from '@storesuseMapStore';
import useBasemap from '@hooks/useBasemap';
import useMapHooks from './useMapHooks';

const accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;
// const transitionInterpolator = new LinearInterpolator();

export default function MapContainer() {
  const layers = getLayers();
  const { viewState, basemapUrl } = useMapStore((state) => state);
  useBasemap();
  const {
    handleResize,
    handleViewStateChange,
    handleToolTip,
    handleCursor,
    handleHover,
  } = useMapHooks();
  return (
    <Box
      height={'100%'}
      width={'100%'}>
      <DeckGL
        controller
        layers={layers}
        onResize={handleResize}
        // @ts-ignore
        onViewStateChange={handleViewStateChange}
        getTooltip={handleToolTip}
        viewState={{
          ...viewState,
        }}
        // @ts-ignore
        onHover={handleHover}
        getCursor={handleCursor}>
        <Map
          mapboxAccessToken={accessToken}
          mapStyle={basemapUrl}
        />
      </DeckGL>
    </Box>
  );
}
