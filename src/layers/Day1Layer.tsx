import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { GeoJsonLayer } from 'deck.gl';
import { useMemo } from 'react';
import { getViewport } from 'utils/map';

const day = 1;

export default function Day1Layer() {
  const { challengeData } = usePageStore((state) => state);
  const { width, height, setViewState } = useMapStore((state) => state);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails)
    return new GeoJsonLayer({
      id: mapDetails.id,
      data: mapDetails.url,
      visible: true,
      pointType: 'circle',
      getPointRadius: 5,
      pointRadiusScale: 1,
      pointRadiusMinPixels: 3,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      getFillColor: [255, 152, 0],
      onDataLoad: (data, context) => {
        const [minLong, minLat, maxLong, maxLat] = bbox(data);
        const bounds = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];
        const viewState = getViewport({ bounds, width, height, padding: 20 });
        setViewState(viewState);
      },
    });
}
