import useMapLayer from '@hooks/useMapLayer';
import { orange, red } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { ArcLayer } from 'deck.gl';
import { useEffect, useMemo } from 'react';
import { d32DeckglColor } from 'utils/conversions';

const day = 5;

interface ArcRow {
  start_lat: number;
  start_long: number;
  end_lat: number;
  end_long: number;
  dist_name: string;
  visited: boolean;
}

const colors = [orange[500], red[500]];

function getCoordinate(
  row: Omit<ArcRow, 'dist_name' | 'visited'>,
  orient: 'start' | 'end',
): number[] {
  const lat = orient + '_lat';
  const long = orient + '_long';
  return [row[long], row[lat]];
}

export default function Day5Layer() {
  const { challengeData } = usePageStore((state) => state);
  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();

  const {
    viewState: { latitude, longitude, zoom },
    setViewState,
  } = useMapStore((state) => state);

  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);

  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        category: 'gradient',
        visible: true,
        styles: {
          colors,
          labels: ['start', 'end'],
        },
      });
    }
  }, [isLoaded]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isLoaded)
    return new ArcLayer<ArcRow>({
      id: mapDetails.id,
      data: mapDetails.url,
      // @ts-ignore
      getSourcePosition: (d) => getCoordinate(d, 'start'),
      // @ts-ignore
      getTargetPosition: (d) => getCoordinate(d, 'end'),

      // @ts-ignore
      getSourceColor: d32DeckglColor(colors[0]),
      // @ts-ignore
      getTargetColor: d32DeckglColor(colors[1]),
      visible,
      onDataLoad: () => {
        setViewState({ latitude, longitude, zoom, pitch: 45 });
      },
      onHover: (value) => {
        if (value.object) {
          value.object.html = `<div>
            <p>${value.object['NAME']}</p>
          </div>`;
        }
      },
      pickable: true,
      updateTriggers: {
        visible,
      },
    });
}
