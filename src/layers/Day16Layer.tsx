import useMapLayer from '@hooks/useMapLayer';
import { orange, red } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { bbox } from '@turf/turf';
import { extent, scaleLinear } from 'd3';
import { GeoJsonLayer } from 'deck.gl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { d32DeckglColor } from 'utils/conversions';
import { getViewport, ViewPortBounds } from 'utils/map';

const day = 16;

interface LayerProps {
  _uid_: number;
  dist_name: string;
  loc_count: number;
}
const colors = [orange[500], red[500]];
const labels = ['Low', 'High'];

export default function Day16Layer() {
  const [range, setRange] = useState<number[] | null>(null);
  const { challengeData } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const { width, height, setViewState, setLayerExtent } = useMapStore(
    (state) => state,
  );

  const handleColor = useCallback(
    (value: number) => {
      if (!range) return [0, 0, 0, 255];
      const scale = scaleLinear(range, colors);
      const color = scale(value);
      console.log(value, color);
      return d32DeckglColor(color);
    },
    [range],
  );

  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);

  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'gradient',
        visible: true,
        styles: {
          colors,
          labels,
        },
      });
    }
  }, [isLoaded]);
  console.log(range);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isLoaded)
    return new GeoJsonLayer<LayerProps>({
      id: mapDetails.id,
      data: mapDetails.url,
      visible,
      // @ts-ignore
      getFillColor: (d) => handleColor(d.properties.loc_count),
      lineWidthUnits: 'pixels',
      getLineWidth: 1,
      onDataLoad: (data) => {
        // @ts-ignore
        setRange(extent(data.features.map((d) => d.properties.loc_count)));
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
        getFillColor: range,
      },
    });
}
