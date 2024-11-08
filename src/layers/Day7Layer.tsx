import { useEffect, useMemo } from 'react';
import { BitmapLayer } from 'deck.gl';
import useMapVisibility from '@hooks/useMapVisibility';
import useMapLayer from '@hooks/useMapLayer';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { getViewport, ViewPortBounds } from 'utils/map';

type RasterLayerBounds = [number, number, number, number];

const day = 7;
const bounds: RasterLayerBounds = [34.586, -12.149, 34.818, -11.985];

export default function Day7Layer() {
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
  }, [isVisible, isChallengeDataReady]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (isVisible && mapDetails)
    return new BitmapLayer({
      id: mapDetails.id,
      image: mapDetails.url,
      bounds,
      loadOptions: {},
      onDataLoad: (data, context) => {
        console.log(data, context);
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
      },
    });
}
