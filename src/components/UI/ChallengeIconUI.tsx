import { SvgIcon } from '@mui/material';
import Logo from '../../assets/DMC_logo.svg?react';

export default function ChallengeIconUI() {
  return (
    // <Link
    //   href='https://30daymapchallenge.com/'
    //   sx={{ height: '100%', textDecoration: 'none' }}>
    <SvgIcon
      // target='_blank'
      // href='https://30daymapchallenge.com/'
      // component={Link}
      sx={{
        height: '100%',
        fontSize: (theme) => theme.spacing(6),
        '& *[class^="cls"] ': {
          fill: (theme) => theme.palette.primary.main + ' !important',
        },
      }}>
      <Logo />
    </SvgIcon>
    // </Link>
  );
}
