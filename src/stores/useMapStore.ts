import { Layer, Layers } from 'types/map';
import { MapDescription } from 'types/data';
import { create } from 'zustand';
import { MapViewState } from 'deck.gl';
import { INITIAL_VIEW_STATE } from 'utils/map';
import { MAP_STYLE_NAMES, MAP_STYLES } from 'styles/mapStyles';

interface MapStore {
  width: number;
  height: number;
  viewState: MapViewState;
  description: MapDescription;
  basemapUrl: string;
  basemapVisible: boolean;
  dataUrl?: string;
  loaded: boolean;
  layers?: Layers;
  setBasemapVisibility: (value: boolean) => void;
  setBasemapUrl: (value: string) => void;
  setLayer: (layerId: number, value: Layer) => void;
  setLayerUpdate: (layerId: number, value: Partial<Layer>) => void;
  setMapDiv: (width: number, height: number) => void;
  setViewState: (value: MapViewState) => void;
  setLayerVisibility: (value: number) => void;
  setLayerRemove: (value: number) => void;
}

const useMapStore = create<MapStore>((set) => ({
  width: 0,
  height: 0,
  basemapUrl: MAP_STYLES[MAP_STYLE_NAMES.DARK],
  basemapVisible: true,
  loaded: false,
  dataUrl: '',
  viewState: INITIAL_VIEW_STATE,
  description: {
    poi: 'Shops',
    location: 'Lilongwe',
    context: 'Shops in Lilongwe',
    sources: ['osm', 'map'],
  },
  setBasemapVisibility: (value) => set({ basemapVisible: value }),

  setBasemapUrl: (value) => set({ basemapUrl: value }),

  setLayer: (layerId, value) =>
    set((state) => {
      const layers = state.layers ?? {};
      layers[layerId] = value;
      return {
        layers,
      };
    }),

  setLayerUpdate: (layerId, value) =>
    set(({ layers }) => {
      if (!layers) return { layers };
      if (!layers[layerId]) return { layers };
      const targetLayer = layers[layerId];
      return {
        layers: {
          ...layers,
          [layerId]: {
            ...targetLayer,
            ...value,
          },
        },
      };
    }),

  setLayerRemove: (value) =>
    set((state) => {
      const layers = state.layers;
      if (!layers) return state;
      if (!layers[value]) return state;
      delete layers[value];

      return {
        layers,
      };
    }),

  setLayerVisibility: (value) =>
    set((state) => ({
      layers: {
        [value]: {
          ...state.layers[value],
          visible: !state.layers[value].visible,
        },
      },
    })),

  setMapDiv: (width, height) => set({ width, height }),

  setViewState: (value) =>
    set((state) => {
      return {
        viewState: {
          ...state.viewState,
          ...value,
        },
      };
    }),
}));

export default useMapStore;
