import { Divider, Grid2, Typography } from '@mui/material';
import usePageStore from 'stores/usePageStore';

export default function Header() {
  return (
    <Grid2
      p={2}
      container
      justifyContent={'space-between'}>
      <Typography
        color='primary'
        variant={'h3'}>
        Points
      </Typography>
      <SelectedDateUI />
    </Grid2>
  );
}

function SelectedDateUI() {
  const date = usePageStore((state) => state.date);
  return (
    <Grid2 container>
      <Typography
        color={'primary'}
        variant={'h3'}>
        {date}
      </Typography>
      <Divider
        sx={{ mx: 1 }}
        flexItem
        orientation={'vertical'}
      />
      <Typography
        variant={'h5'}
        sx={{ alignSelf: 'end' }}>
        30
      </Typography>
    </Grid2>
  );
}
