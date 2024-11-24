import useMapLayer from '@hooks/useMapLayer';
import { Box, Divider, Slider, Typography } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

interface OpacityControlProps {
  layerId: number;
}

export default function OpacityControl(props: OpacityControlProps) {
  const { layerId } = props;
  const { getExtraLayerPros, handleLayerUpdate } = useMapLayer();

  const opacity = getExtraLayerPros(layerId, 'opacity') || 1;

  const handleChange = (_event, value: number) => {
    handleLayerUpdate(layerId, {
      extras: {
        opacity: value,
      },
    });
  };

  const handleFormat = (value: number) => {
    return `${100 * value}%`;
  };

  return (
    <Fragment>
      <Typography variant='subtitle1'>Layer Opacity Control</Typography>
      <Divider
        sx={{ my: 1 }}
        orientation='horizontal'
      />
      <Box sx={{ pr: 2 }}>
        <Slider
          value={opacity}
          valueLabelDisplay='auto'
          valueLabelFormat={handleFormat}
          // marks
          step={0.01}
          min={0}
          max={1}
          aria-label='opacity'
          onChange={handleChange}
        />
      </Box>
    </Fragment>
  );
}
