import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import usePageStore from '@storesusePageStore';
import { Fragment, PropsWithChildren, ReactNode, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen}>
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
