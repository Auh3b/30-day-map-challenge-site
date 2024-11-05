import { UnfoldLessRounded, UnfoldMoreRounded } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import useMapStore from '@storesuseMapStore';
import { zip } from 'd3';
import { Fragment, useMemo, useState } from 'react';
import { Layer, LayerStyle } from 'types/map';

export default function Legend() {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen((value) => !value);
  };
  const _layers = useMapStore((state) => state.layers);
  const layers = useMemo(() => {
    if (!_layers) return [];
    return Object.values(_layers);
  }, [_layers]);

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <LegendTitle
        isOpen={isOpen}
        handleOpen={handleOpen}
      />
      <Divider
        sx={{ mb: 2, display: isOpen ? 'block' : 'none' }}
        orientation='horizontal'
      />
      <Collapse in={isOpen}>
        {layers.map((d, i) => (
          <LegendItem
            key={`legend-item-${i}`}
            {...d}
          />
        ))}
      </Collapse>
    </Paper>
  );
}

interface LegendTitleProps {
  isOpen: boolean;
  handleOpen: () => void;
}

function LegendTitle(props: LegendTitleProps) {
  const { isOpen, handleOpen } = props;
  return (
    <Grid2
      container
      alignContent={'center'}
      justifyContent={'space-between'}>
      <Typography
        fontStyle={'italic'}
        variant={'subtitle1'}
        sx={{ alignSelf: 'center' }}>
        Legend
      </Typography>
      <IconButton
        size='small'
        onClick={handleOpen}>
        {isOpen ? <UnfoldLessRounded /> : <UnfoldMoreRounded />}
      </IconButton>
    </Grid2>
  );
}

function LegendItem(props: Layer) {
  const { title, category, visible, styles } = props;
  return (
    <Fragment>
      {visible && (
        <Box>
          <Typography
            sx={{ mb: 1, display: 'block' }}
            variant={'overline'}>
            {title}
          </Typography>
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
      gap={1}
      direction={'column'}>
      <Box
        sx={{
          borderRadius: 24,
          height: 10,
          backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        }}></Box>
      <Grid2
        justifyContent={'space-between'}
        alignItems={'center'}
        container>
        {labels.map((t) => (
          <Typography
            variant={'caption'}
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
          <Typography variant={'caption'}>{label}</Typography>
        </Grid2>
      ))}
    </Grid2>
  );
}
