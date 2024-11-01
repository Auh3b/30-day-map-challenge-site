export type MapStyleMode = 'light' | 'dark';

export const MAP_STYLE_NAMES: { [k: string]: MapStyleMode } = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const MAP_STYLES = {
  [MAP_STYLE_NAMES.DARK]:
    'mapbox://styles/robertchiko/cm2vkgyv100k401pkbusqb00u',
  [MAP_STYLE_NAMES.LIGHT]:
    'mapbox://styles/robertchiko/cm2z3nwja00d801qw378n20u9',
};

//export default MAP_STYLES;
