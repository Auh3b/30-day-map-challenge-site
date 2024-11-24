import useMapLayer from '@hooks/useMapLayer';
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

  const { handleLayerUpdate, getLayerLoad, getLayerVisibility } = useMapLayer();
  const { width, height, setViewState, setLayerExtent } = useMapStore(
    (state) => state,
  );

  const isLoaded = getLayerLoad(day);
  const visible = getLayerVisibility(day);
  useEffect(() => {
    if (isLoaded) {
      handleLayerUpdate(day, {
        visible: true,
        styles: {
          colors,
          labels: ['National Reserve'],
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
        setLayerExtent(day, viewState);
      },
      onHover: (value) => {
        if (value.object) {
          value.object.html = `<div>
            <p>${value.object.properties['NAME']}</p>
          </div>`;
        }
      },
      updateTriggers: {
        visible,
      },
    });
}
