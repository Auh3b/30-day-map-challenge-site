import useMapLayer from '@hooks/useMapLayer';
import useMapVisibility from '@hooks/useMapVisibility';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { GeoJsonLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { getViewport, ViewPortBounds } from 'utils/map';

const day = 2;

export default function Day2Layer() {
  const { challengeData } = usePageStore((state) => state);
  const { width, height, setViewState } = useMapStore((state) => state);
  const { handleLayer } = useMapLayer();
  const isChallengeDataReady = Boolean(challengeData);

  const isVisible = useMapVisibility(day);

  useEffect(() => {
    if (isChallengeDataReady) {
      handleLayer({
        [day]: {
          name: challengeData[day].id,
          title: challengeData[day].title,
          category: 'category',
          visible: isVisible,
          styles: {
            colors: ['orange'],
            labels: ['Rail'],
          },
        },
      });
    }
  }, [isVisible, isChallengeDataReady]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isVisible)
    return new GeoJsonLayer({
      id: mapDetails.id,
      data: mapDetails.url,
      visible: true,
      lineWidthUnits: 'pixels',
      getLineWidth: 1,
      getLineColor: [255, 152, 0],
      onDataLoad: (data) => {
        // @ts-ignore
        const [minLong, minLat, maxLong, maxLat] = bbox(data);
        const bounds: ViewPortBounds = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];
        const viewState = getViewport({ bounds, width, height, padding: 20 });
        setViewState(viewState);
      },
    });
}
