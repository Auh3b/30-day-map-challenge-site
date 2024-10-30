import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import usePageStore from '@storesusePageStore';
import { Fragment, PropsWithChildren, ReactNode, useCallback } from 'react';

export default function DayChallengeDetailsModal() {
  return (
    <DetailsModalWrapper>
      <DetailsModalContent />
    </DetailsModalWrapper>
  );
}

interface DetailsModalWrapperProps {
  actions?: ReactNode[];
}

function DetailsModalWrapper(
  props: PropsWithChildren<DetailsModalWrapperProps>,
) {
  const { welcomed, setWelcomed } = usePageStore((state) => state);

  const handleClose = useCallback(() => {
    setWelcomed(!welcomed);
  }, [welcomed]);

  return (
    <Dialog
      open={!welcomed}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(12px)',
          },
        },
      }}>
      {props.children}
      <DialogActions>
        {props.actions ? props.actions.map((d) => d) : null}
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function DetailsModalContent() {
  const dsd = usePageStore((state) => state.dayChallenge);
  return (
    <Fragment>
      <DialogTitle>
        {dsd?.name} - {dsd?.date}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{dsd?.description}</DialogContentText>
      </DialogContent>
    </Fragment>
  );
}
