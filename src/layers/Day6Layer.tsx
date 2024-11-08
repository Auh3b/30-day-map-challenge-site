import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapVisibility from '@hooks/useMapVisibility';
import useMapLayer from '@hooks/useMapLayer';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';

type RasterLayerBounds = [number, number, number, number];

const day = 6;
const bounds: RasterLayerBounds = [
  32.671527767, -17.127083322, 35.9148611, -9.364027767,
];

export default function Day6Layer() {
  const { challengeData } = usePageStore((state) => state);

  const { width, height, viewState, setViewState } = useMapStore(
    (state) => state,
  );

  const { handleLayer } = useMapLayer();

  const isChallengeDataReady = Boolean(challengeData);

  const isVisible = useMapVisibility(day);

  useEffect(() => {
    if (isChallengeDataReady) {
      handleLayer({
        [day]: {
          name: challengeData[day].id,
          title: challengeData[day].title,
          category: 'image',
          visible: isVisible,
          styles: {
            colors: [],
            labels: ['Malawi'],
          },
        },
      });
    }
    if (isVisible) {
      const bounds: ViewPortBounds = [
        [32.671527767, -17.127083322],
        [35.9148611, -9.364027767],
      ];
      const { latitude, longitude, zoom } = getViewport({
        bounds,
        width,
        height,
        padding: 20,
      });
      setViewState({ ...viewState, latitude, longitude, zoom });
    }
  }, [isVisible, isChallengeDataReady]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (isVisible && mapDetails)
    return new BitmapLayer({
      id: mapDetails.id,
      image: mapDetails.url,
      bounds,
    });
}
