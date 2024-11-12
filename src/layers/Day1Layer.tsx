import useMapLayer from '@hooks/useMapLayer';
import { orange } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { GeoJsonLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { getViewport, ViewPortBounds } from 'utils/map';

const day = 1;

export default function Day1Layer() {
  const { challengeData } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();
  const { width, height, setViewState } = useMapStore((state) => state);
  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);
  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'category',
        visible: true,
        styles: {
          colors: [orange[500]],
          labels: ['Displace Population'],
        },
      });
    }
  }, [isLoaded]);
  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isLoaded)
    return new GeoJsonLayer({
      id: mapDetails.id,
      data: mapDetails.url,
      visible,
      pickable: true,
      pointType: 'circle',
      getPointRadius: 5,
      pointRadiusScale: 1,
      pointRadiusMinPixels: 3,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      getFillColor: [255, 152, 0],
      onDataLoad: (data) => {
        // @ts-ignore
        const [minLong, minLat, maxLong, maxLat] = bbox(data);

        const bounds: ViewPortBounds = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];
        const viewState = getViewport({ bounds, width, height, padding: 20 });
        setViewState({ ...viewState, pitch: 0 });
      },
      updateTriggers: {
        visible,
      },
    });
}
