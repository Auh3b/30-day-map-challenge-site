import useMapLayer from '@hooks/useMapLayer';
import { grey, orange } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { GeoJsonLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { d32DeckglColor } from 'utils/conversions';
import { getViewport, ViewPortBounds } from 'utils/map';

const day = 18;

interface LayerProps {
  oid: number;
  b_name: string | null;
  height: number;
  area: number;
}

export default function Day18Layer() {
  const { challengeData, theme } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const { width, height, setViewState, setLayerExtent } = useMapStore(
    (state) => state,
  );

  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);

  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'category',
        visible: true,
        styles: {
          colors: [orange[500]],
          labels: ['Building'],
        },
      });
    }
  }, [isLoaded]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isLoaded)
    return new GeoJsonLayer<LayerProps>({
      id: mapDetails.id,
      data: mapDetails.url,
      visible,
      wireframe: true,
      extruded: true,
      getElevation: (d) => d.properties.height,
      // @ts-ignore
      getFillColor:
        theme === 'dark'
          ? d32DeckglColor(grey[800], 150)
          : d32DeckglColor(grey[100], 150),
      // @ts-ignore
      elevationScale: 5,
      lineWidthUnits: 'pixels',
      getLineWidth: 1,
      getLineColor: [255, 152, 0],
      onDataLoad: (data) => {
        console.log(data);
        // @ts-ignore
        const [minLong, minLat, maxLong, maxLat] = bbox(data);
        const bounds: ViewPortBounds = [
          [minLong, minLat],
          [maxLong, maxLat],
        ];
        const viewState = getViewport({ bounds, width, height, padding: 20 });
        setViewState({ ...viewState, pitch: 0 });
        setLayerExtent(day, viewState);
      },
      updateTriggers: {
        visible,
        getFillColor: theme,
      },
    });
}
