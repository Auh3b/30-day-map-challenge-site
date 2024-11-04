import useMapLayer from '@hooks/useMapLayer';
import useMapVisibility from '@hooks/useMapVisibility';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { H3HexagonLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';

const day = 4;

export default function Day4Layer() {
  const { challengeData } = usePageStore((state) => state);
  const {
    viewState: { latitude, longitude, zoom },
    setViewState,
  } = useMapStore((state) => state);
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
            labels: ['H3'],
          },
        },
      });
    }
  }, [isVisible, isChallengeDataReady]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isVisible)
    return new H3HexagonLayer({
      id: mapDetails.id,
      data: mapDetails.url,
      visible: true,
      getHexagon: (d) => d['h3_code'],
      getFillColor: [255, 152, 0],
      getLineColor: [0, 0, 0],
      lineWidthUnits: 'pixels',
      getLineWidth: 1,
      wireframe: true,
      onDataLoad: () => {
        setViewState({ latitude, longitude, zoom, pitch: 45 });
      },
    });
}
