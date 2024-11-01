import { Box } from '@mui/material';
import DeckGL, { MapViewState } from 'deck.gl';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getLayers from 'layers';
import useMapStore from '@storesuseMapStore';
import useBasemap from '@hooks/useBasemap';

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: -13.96692,
  longitude: 33.78725,
  zoom: 4,
};

const accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;

export default function MapContainer() {
  const layers = getLayers();
  return (
    <Box
      height={'100%'}
      width={'100%'}>
      <DeckGL
        layers={layers}
        controller
        initialViewState={INITIAL_VIEW_STATE}>
        <MapBoxMapLayer />
      </DeckGL>
    </Box>
  );
}

function MapBoxMapLayer() {
  const basemapUrl = useMapStore((state) => state.basemapUrl);
  useBasemap();
  return (
    <Map
      mapboxAccessToken={accessToken}
      mapStyle={basemapUrl}
    />
  );
}
