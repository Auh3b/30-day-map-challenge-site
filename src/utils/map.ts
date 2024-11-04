import { MapViewState, WebMercatorViewport } from 'deck.gl';

export const INITIAL_VIEW_STATE: MapViewState = {
  latitude: -13.96692,
  longitude: 33.78725,
  zoom: 2,
};

interface ViewPortProps {
  bounds: [[number, number], [number, number]];
  width: number;
  height: number;
  padding?: number;
}

interface ViewPortOut extends MapViewState {}

export function getViewport(value: ViewPortProps): ViewPortOut {
  const { bounds, width, height, padding = 10 } = value;
  const viewPort = new WebMercatorViewport();
  const { latitude, longitude, zoom, position, bearing, pitch } =
    viewPort.fitBounds(bounds, {
      width,
      height,
      padding,
    });
  return {
    latitude,
    longitude,
    zoom,
    position,
    bearing,
    pitch,
  };
}
