import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';
import useMapLayer from '@hooks/useMapLayer';

type RasterLayerBounds = [number, number, number, number];

const day = 10;
const bounds: RasterLayerBounds = [
  35.2212379296549685, -15.453589948486318, 35.4452312919441681,
  -15.2943736344930219,
];
const [minX, minY, maxX, maxY] = bounds;

export default function Day10Layer() {
  const { challengeData } = usePageStore((state) => state);

  const {
    handleLayerUpdate,
    getLayerLoad,
    getLayerVisibility,
    getExtraLayerPros,
  } = useMapLayer();

  const { width, height, viewState, setViewState, setLayerExtent } =
    useMapStore((state) => state);

  const opacity = getExtraLayerPros(day, 'opacity') || 1;
  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);
  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'image',
        visible: true,
        styles: {
          colors: [],
          labels: ['Zomba City'],
        },
        extras: {
          opacity: 1,
        },
      });

      const bounds: ViewPortBounds = [
        [minX, minY],
        [maxX, maxY],
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
      image: mapDetails.url,
      bounds,
      visible,
      opacity,
      loadOptions: {},
      updateTriggers: {
        visible,
        opacity,
      },
    });
}
