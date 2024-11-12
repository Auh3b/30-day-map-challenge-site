import useMapLayer from '@hooks/useMapLayer';
import { orange } from '@mui/material/colors';
import usePageStore from '@storesusePageStore';
import { format, scaleLog } from 'd3';
import { ScatterplotLayer } from 'deck.gl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { d32DeckglColor } from 'utils/conversions';
import { getRange } from 'utils/data';

const day = 8;

interface ArcRow {
  o_pcode: string;
  a_pcode: string;
  population: number;
  latitude: number;
  longitude: number;
  name: string;
}

const colors = [orange[500]];

export default function Day8Layer() {
  const { challengeData } = usePageStore((state) => state);

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const [range, setRange] = useState<null | number[]>(null);

  const isLoaded = getLayerLoad(day);

  const handleRange = (data) => {
    setRange(getRange<ArcRow>(data, 'population'));
  };
  const visible = getLayerVisibility(day);

  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'category',
        visible: true,
        styles: {
          colors,
          labels: ['Displace Population'],
        },
      });
    }
  }, [isLoaded]);

  const handeRadius = useCallback(
    (value: number) => {
      if (!range) return 1;
      const scale = scaleLog(range, [1, 100]);
      return scale(value);
    },
    [range],
  );

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isLoaded)
    return new ScatterplotLayer<ArcRow>({
      id: mapDetails.id,
      data: mapDetails.url,
      // stroked: true,
      visible,
      getRadius: ({ population }) => handeRadius(population),
      getPosition: ({ latitude, longitude }) => {
        return [longitude, latitude];
      },
      radiusScale: 10000,

      // @ts-ignore
      getFillColor: d32DeckglColor(colors[0], 100),
      onHover: (value) => {
        if (value.object) {
          value.object.html = `<div>
            <p>${value.object['name'] || 'South Sudan'}</p>
            <p>${format(',.2r')(value.object['population'])}</p>
          </div>`;
        }
      },
      onDataLoad: (data) => {
        handleRange(data);
      },
      pickable: true,
      updateTriggers: {
        visible: visible,
        getRadius: range,
      },
    });
}
