import { ZoomOutMapRounded } from '@mui/icons-material';
import { IconButton, Paper, Tooltip } from '@mui/material';
import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { useCallback } from 'react';
import { Fragment } from 'react/jsx-runtime';

export default function ZoomToLayer() {
  const layerId = usePageStore((state) => state.date);

  const { setViewState, layerExtent } = useMapStore((state) => state);

  const handleClick = useCallback(() => {
    const newViewState = layerExtent?.[layerId] ?? false;
    if (newViewState) return setViewState(newViewState);
  }, [layerId, layerExtent]);

  return (
    <Fragment>
      <Tooltip
        arrow
        title='Zoom to layer'
        placement='right'>
        <Paper>
          <IconButton onClick={handleClick}>
            <ZoomOutMapRounded />
          </IconButton>
        </Paper>
      </Tooltip>
    </Fragment>
  );
}
