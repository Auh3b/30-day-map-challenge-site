import { Box, Grid2 } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ToolbarContainerProps {
  placement?: 'top-left' | 'top-right';
  orientation?: 'vertical' | 'horizontal';
}

const PLACEMENT_MAP = {
  'top-left': {
    top: 8,
    left: 16,
  },
  'top-right': {
    top: 8,
    right: 8,
  },
};

const ORIENTATION_MAP = {
  vertical: {
    direction: 'column',
  },
  horizontal: {
    direction: 'row',
  },
};

export default function ToolbarContainer(
  props: PropsWithChildren<ToolbarContainerProps>,
) {
  const { placement = 'top-left', orientation = 'vertical' } = props;
  const placementProps = PLACEMENT_MAP[placement];
  const directionProps = ORIENTATION_MAP[orientation];
  return (
    <Box
      {...placementProps}
      position={'absolute'}
      zIndex={100}>
      <Grid2
        {...directionProps}
        gap={1}
        container
        alignItems={'center'}>
        {props.children}
      </Grid2>
    </Box>
  );
}
