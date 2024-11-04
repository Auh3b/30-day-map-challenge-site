import { Box, Grid2, Paper, Typography } from '@mui/material';
import useMapStore from '@storesuseMapStore';
import { zip } from 'd3';
import { Fragment, useMemo } from 'react';
import { Layer, LayerStyle } from 'types/map';

export default function Legend() {
  const _layers = useMapStore((state) => state.layers);
  const layers = useMemo(() => {
    if (!_layers) return [];
    return Object.values(_layers);
  }, [_layers]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        fontStyle={'italic'}
        variant={'body2'}
        sx={{ mb: 2 }}>
        Legend
      </Typography>
      {layers.map((d, i) => (
        <LegendItem
          key={`legend-item-${i}`}
          {...d}
        />
      ))}
    </Paper>
  );
}

function LegendItem(props: Layer) {
  const { title, category, visible, styles } = props;
  return (
    <Fragment>
      {visible && (
        <Box>
          <Typography variant={'caption'}>{title}</Typography>
          {category === 'category' ? (
            <CategoryIcon {...styles} />
          ) : (
            <GradientIcon {...styles} />
          )}
        </Box>
      )}
    </Fragment>
  );
}

function GradientIcon(props: LayerStyle) {
  const { colors, labels } = props;
  return (
    <Grid2
      container
      direction={'column'}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to left ${colors[0]} ${colors[1]})`,
        }}></Box>
      <Grid2
        justifyContent={'space-between'}
        alignItems={'center'}
        container>
        {labels.map((t) => (
          <Typography
            variant={'overline'}
            key={t}>
            {t}
          </Typography>
        ))}
      </Grid2>
    </Grid2>
  );
}

function CategoryIcon(props: LayerStyle) {
  const { colors, labels } = props;
  const items = useMemo(() => zip(colors, labels), [colors, labels]);
  return (
    <Grid2>
      {items.map(([color, label]) => (
        <Grid2
          alignItems={'center'}
          container
          gap={3}
          key={label}>
          <Box
            sx={{
              border: '1px black solid',
              borderRadius: '100%',
              width: 10,
              height: 10,
              background: color,
            }}></Box>
          <Typography variant={'overline'}>{label}</Typography>
        </Grid2>
      ))}
    </Grid2>
  );
}
