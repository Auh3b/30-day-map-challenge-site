import useMapStore from '@storesuseMapStore';

export default function useMapParams(values: string[]) {
  const state = useMapStore((state) => state);
  const mapParams = {};

  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    const item = state[element];
    mapParams[i] = item;
  }

  return mapParams;
}
