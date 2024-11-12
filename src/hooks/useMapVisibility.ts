import useMapStore from '@storesuseMapStore';

export default function useMapVisibility(value: number) {
  const layers = useMapStore((state) => state.layers) ?? {};
  return Boolean(layers[value]);
}
