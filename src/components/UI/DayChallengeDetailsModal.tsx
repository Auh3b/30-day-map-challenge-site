import PropertyView from '@components/common/PropertyView';
import { CalendarTodayOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  Typography,
} from '@mui/material';
import usePageStore from '@storesusePageStore';
import { DayChallengeData } from 'types/data';
import {
  Fragment,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

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
  const { dayChallenge, date, challengeData } = usePageStore((state) => state);
  const mapProp = useMemo(() => {
    if (!challengeData)
      return {
        sources: [],
        id: '',
        url: '',
        title: '',
        subject: '',
        location: '',
        description: '',
      };
    return {
      ...challengeData[date],
    };
  }, [challengeData, date]);

  console.log(mapProp);

  return (
    <Fragment>
      <DialogTitle>
        <ModalTitle
          title={dayChallenge?.name}
          date={dayChallenge?.date}
        />
      </DialogTitle>
      <DialogContent>
        <ModalContent
          challenge={dayChallenge?.description}
          {...mapProp}
        />
      </DialogContent>
    </Fragment>
  );
}

interface ModalTitleProps {
  title?: string;
  date?: string;
}

function ModalTitle(props: ModalTitleProps) {
  const { title, date } = props;
  return (
    <Grid2
      container
      justifyContent={'space-between'}>
      <Typography variant='h6'>{title}</Typography>
      <Grid2
        alignItems={'center'}
        container
        gap={1}>
        <CalendarTodayOutlined fontSize={'small'} />
        <Typography>{date}</Typography>
      </Grid2>
    </Grid2>
  );
}

interface ModalContentProps extends DayChallengeData {
  challenge?: string;
}

function ModalContent(props: ModalContentProps) {
  const { challenge, subject, description, location, sources = [] } = props;
  const details: null | [string, string, boolean][] = useMemo(() => {
    if (!subject) return null;
    return [
      ['Subject', subject, true],
      ['Location', location, true],
      ['Description', description, true],
      ['Sources', sources.join(', '), false],
    ];
  }, [props]);
  return (
    <Grid2
      container
      wrap='nowrap'>
      <Grid2 size={5}>
        <Typography
          sx={{ mb: 1 }}
          fontStyle={'italic'}
          variant='subtitle2'>
          Challenge
        </Typography>
        <Typography>{challenge}</Typography>
      </Grid2>
      {details && (
        <>
          <Divider
            sx={{ mx: 2 }}
            flexItem
            orientation='vertical'
          />

          <Grid2 size={5}>
            <MapDataModalContent details={details} />
          </Grid2>
        </>
      )}
    </Grid2>
  );
}

interface MapDataModalContentProps {
  details: [string, string, boolean][];
}

function MapDataModalContent(props: MapDataModalContentProps) {
  return (
    <>
      {props.details.map(([name, value, bordered]) => (
        <PropertyView
          key={name}
          name={name}
          value={value}
          bordered={bordered}
        />
      ))}
    </>
  );
}
