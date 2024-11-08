import { SvgIcon } from '@mui/material';
import Logo from '../../assets/DMC_logo.svg?react';

export default function ChallengeIconUI() {
  return (
    <SvgIcon
      sx={{
        height: '100%',
        fontSize: (theme) => theme.spacing(6),
        '& *[class^="cls"] ': {
          fill: (theme) => theme.palette.primary.main + ' !important',
        },
      }}>
      <Logo />
    </SvgIcon>
  );
}
