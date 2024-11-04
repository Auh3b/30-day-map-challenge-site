import { Layers } from 'types/map';
import { MapDescription } from 'types/data';
import { create } from 'zustand';
import { MapViewState } from 'deck.gl';
import { INITIAL_VIEW_STATE } from 'utils/map';

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
  setLayer: (value: Layers) => void;
  setMapDiv: (width: number, height: number) => void;
  setViewState: (value: MapViewState) => void;
}

const useMapStore = create<MapStore>((set) => ({
  width: 0,
  height: 0,
  basemapUrl: 'mapbox://styles/robertchiko/cm2vkgyv100k401pkbusqb00u',
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
  setLayer: (value) =>
    set(({ layers }) => ({ layers: { ...layers, ...value } })),
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
