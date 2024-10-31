import { MapDescription } from 'types/data';
import { create } from 'zustand';

interface MapStore {
  description: MapDescription;
  basemapUrl: string;
  basemapVisible: boolean;
  dataUrl?: string;
  loaded: boolean;
  setBasemapVisibility: (value: boolean) => void;
}

const useMapStore = create<MapStore>((set) => ({
  basemapUrl: 'mapbox://styles/robertchiko/cm2vkgyv100k401pkbusqb00u',
  basemapVisible: true,
  loaded: false,
  dataUrl: '',
  description: {
    poi: 'Shops',
    location: 'Lilongwe',
    context: 'Shops in Lilongwe',
    sources: ['osm', 'map'],
  },
  setBasemapVisibility: (value) => set({ basemapVisible: value }),
}));

export default useMapStore;
