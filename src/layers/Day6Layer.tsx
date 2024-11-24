import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';
import useMapLayer from '@hooks/useMapLayer';

type RasterLayerBounds = [number, number, number, number];

const day = 6;
const bounds: RasterLayerBounds = [
  32.671527767, -17.127083322, 35.9148611, -9.364027767,
];

export default function Day6Layer() {
  const { challengeData } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const { width, height, viewState, setViewState, setLayerExtent } =
    useMapStore((state) => state);

  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);

  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'image',
        visible: true,
        styles: {
          colors: [],
          labels: ['Elevation'],
        },
      });
      const bounds: ViewPortBounds = [
        [32.671527767, -17.127083322],
        [35.9148611, -9.364027767],
      ];
      const newViewState = getViewport({
        bounds,
        width,
        height,
        padding: 20,
      });
      setViewState({ ...viewState, ...newViewState });
      setLayerExtent(day, newViewState);
    }
  }, [isLoaded]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (isLoaded && mapDetails)
    return new BitmapLayer({
      id: mapDetails.id,
      visible,
      image: mapDetails.url,
      bounds,
      updateTriggers: {
        visible,
      },
    });
}
