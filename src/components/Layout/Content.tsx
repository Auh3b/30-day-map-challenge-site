import MapContainer from '@component/common/MapContainer';
import { Grid2 as Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Content(props: PropsWithChildren) {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ position: 'relative', flexGrow: 1 }}>
      {props.children}
      <MapContainer />
    </Grid>
  );
}
