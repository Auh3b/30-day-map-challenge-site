import useMapLayer from '@hooks/useMapLayer';
import useMapVisibility from '@hooks/useMapVisibility';
import { green } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { GeoJsonLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { d32DeckglColor } from 'utils/conversions';
import { getViewport, ViewPortBounds } from 'utils/map';

const day = 3;
const colors = [green[500]];

export default function Day3Layer() {
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
            colors,
            labels: ['Reserve'],
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
      stroked: true,
      pickable: true,
      // @ts-ignore
      getFillColor: d32DeckglColor(colors[0]),
      onDataLoad: (data) => {
        //@ts-ignore
        const [minLong, minLat, maxLong, maxLat] = bbox(data);

        const bounds: ViewPortBounds = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];

        const viewState = getViewport({ bounds, width, height, padding: 20 });

        setViewState({ ...viewState, pitch: 0 });
      },
      onHover: (value) => {
        if (value.object) {
          value.object.html = `<div>
            <p>${value.object.properties['NAME']}</p>
          </div>`;
        }
      },
    });
}
