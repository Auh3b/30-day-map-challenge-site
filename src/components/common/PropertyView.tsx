import { Divider, Grid2, Typography } from '@mui/material';

interface PropertyViewProps {
  name: string;
  value: string;
  bordered?: boolean;
}

export default function PropertyView(props: PropertyViewProps) {
  const { name, value, bordered } = props;
  return (
    <Grid2
      container
      direction={'column'}
      wrap='nowrap'>
      <Typography
        fontStyle={'italic'}
        variant='subtitle2'>
        {name}:
      </Typography>
      <Typography color='primary'>{value}</Typography>
      <Divider
        orientation='horizontal'
        flexItem
        sx={{ display: bordered ? 'block' : 'none', mt: 2, mb: 1 }}
      />
    </Grid2>
  );
}
