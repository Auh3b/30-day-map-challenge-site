import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';
import useMapLayer from '@hooks/useMapLayer';

type RasterLayerBounds = [number, number, number, number];

const day = 9;
const bounds: RasterLayerBounds = [
  33.816362048, -13.995758337, 33.744099609, -13.941561508,
];
const [minX, minY, maxX, maxY] = bounds;

const viewPortBounds: ViewPortBounds = [
  [minX, minY],
  [maxX, maxY],
];

export default function Day9Layer() {
  const { challengeData } = usePageStore((state) => state);

  const {
    handleLayerUpdate,
    getLayerLoad,
    getLayerVisibility,
    getExtraLayerPros,
  } = useMapLayer();

  const { width, height, viewState, setViewState } = useMapStore(
    (state) => state,
  );
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
          labels: ['Lilongwe City - AI Generated'],
        },
      });

      const { latitude, longitude, zoom } = getViewport({
        bounds: viewPortBounds,
        width,
        height,
        padding: 20,
      });
      setViewState({ ...viewState, latitude, longitude, zoom });
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
