import useMapStore from '@storesuseMapStore';
import { Layers } from 'types/map';

export default function useMapLayer() {
  const { layers, setLayer } = useMapStore((state) => state);
  const handleLayer = (value: Layers) => {
    setLayer(value);
  };
  return {
    layers,
    handleLayer,
  };
}
