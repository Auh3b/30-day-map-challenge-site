import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';
import useMapLayer from '@hooks/useMapLayer';

type RasterLayerBounds = [number, number, number, number];

const day = 7;
const bounds: RasterLayerBounds = [34.586, -12.149, 34.818, -11.985];

export default function Day7Layer() {
  const { challengeData } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const { width, height, viewState, setViewState } = useMapStore(
    (state) => state,
  );
  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);
  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'image',
        visible: true,
        styles: {
          colors: [],
          labels: ['Displace Population'],
        },
      });

      const bounds: ViewPortBounds = [
        [34.586, -12.149],
        [34.818, -11.985],
      ];
      const { latitude, longitude, zoom } = getViewport({
        bounds,
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
      loadOptions: {},
      updateTriggers: {
        visible,
      },
    });
}
