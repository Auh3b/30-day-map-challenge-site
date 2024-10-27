import { IconButton, Paper, Tooltip } from '@mui/material';
import { PropsWithChildren } from 'react';

interface SingleModeSwitchProps {
  title?: string;
  onClick: () => void;
}

export default function SingleModeSwitch(
  props: PropsWithChildren<SingleModeSwitchProps>,
) {
  return (
    <Paper>
      <Tooltip
        title={props.title || ''}
        arrow>
        <IconButton onClick={props.onClick}>{props.children}</IconButton>
      </Tooltip>
    </Paper>
  );
}
