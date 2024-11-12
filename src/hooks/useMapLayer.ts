import useMapStore from '@storesuseMapStore';
import { useCallback } from 'react';
import { Layer } from 'types/map';

export default function useMapLayer() {
  const {
    layers = {},
    setLayer,
    setLayerRemove,
    setLayerUpdate,
  } = useMapStore((state) => state);
  const handleLayerAdd = (layerId: number, value: Layer) => {
    setLayer(layerId, value);
  };

  console.log(layers);

  const handleLayerRemove = (value: number) => {
    setLayerRemove(value);
  };

  const handleLayerUpdate = (layerId: number, value: Partial<Layer>) => {
    setLayerUpdate(layerId, value);
  };

  const getLayerLoad = useCallback(
    (layerId: number) => {
      return Boolean(layers[layerId]);
    },
    [layers],
  );

  const getLayerVisibility = useCallback(
    (layerId: number) => {
      return layers[layerId]?.visible ?? false;
    },
    [layers],
  );
  return {
    layers,
    handleLayerAdd,
    handleLayerRemove,
    handleLayerUpdate,
    getLayerLoad,
    getLayerVisibility,
  };
}
