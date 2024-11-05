import useMapLayer from '@hooks/useMapLayer';
import useMapVisibility from '@hooks/useMapVisibility';
import { orange, red } from '@mui/material/colors';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { extent, scaleLinear } from 'd3';
import { H3HexagonLayer } from 'deck.gl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { d32DeckglColor } from 'utils/conversions';

const day = 4;

interface HexRow {
  ['h3_code']: string;
  max: number;
  sum: number;
  mean: number;
  min: number;
}

type NumRange = number[];
type TextRange = string[];

type HexDataType = HexRow[];

const getRange = (data: HexDataType, column: keyof Omit<HexRow, 'h3_code'>) => {
  return extent(data, (d) => d[column]);
};

const getColorScale = (num: NumRange, colors: TextRange) => {
  return scaleLinear(num, colors);
};

const colors = [orange[500], red[500]];

export default function Day4Layer() {
  const [range, setRange] = useState<null | NumRange>(null);

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
          category: 'gradient',
          visible: isVisible,
          styles: {
            colors: colors,
            labels: ['Low', 'High'],
          },
        },
      });
    }
  }, [isVisible, isChallengeDataReady]);

  const handleRange = (data: HexDataType) => {
    setRange(getRange(data, 'sum'));
  };

  const handleColor = useCallback(
    (value: number) => {
      if (range) {
        const scale = getColorScale(range, colors);
        const normalColor = scale(value);
        const deckglColor = d32DeckglColor(normalColor);
        return deckglColor;
      }
    },
    [range],
  );

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (mapDetails && isVisible)
    return new H3HexagonLayer<HexRow>({
      id: mapDetails.id,
      data: mapDetails.url,
      visible: true,
      extruded: true,
      elevationScale: 1,
      getHexagon: (d) => d.h3_code,
      getElevation: (d) => d.sum,
      // @ts-ignore
      getFillColor: (d) => handleColor(d.sum),
      getLineColor: [255, 255, 255],
      lineWidthUnits: 'pixels',
      getLineWidth: 0.1,
      // wireframe: true,
      onDataLoad: (data) => {
        handleRange(data as HexDataType);
        setViewState({ latitude, longitude, zoom, pitch: 45 });
      },
      onHover: (value) => {
        if (value.object) {
          value.object.html = `<div>
            <p>${Math.floor(value.object['sum'])}</p>
          </div>`;
        }
      },
      pickable: true,
    });
}
