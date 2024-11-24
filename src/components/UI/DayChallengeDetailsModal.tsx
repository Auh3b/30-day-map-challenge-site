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
import useMediaQuery from '@mui/material/useMediaQuery';
import usePageStore from '@storesusePageStore';
import { DayChallengeData } from 'types/data';
import {
  Fragment,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { challenge, subject, description, location, sources = [] } = props;
  const details: null | [string, string, boolean][] = useMemo(() => {
    if (!subject) return null;
    return [
      ['Subject', subject, !isMobile],
      ['Location', location, !isMobile],
      ['Description', description, !isMobile],
      ['Sources', sources.join(', '), false],
    ];
  }, [props, isMobile]);
  return (
    <Grid2
      container
      direction={isMobile ? 'column' : 'row'}
      wrap='nowrap'>
      <Grid2 size={isMobile ? 12 : 5}>
        <ModalContentSectionTitle>Challenge</ModalContentSectionTitle>
        <Typography>{challenge}</Typography>
      </Grid2>
      {details && (
        <>
          <Divider
            sx={{ mx: isMobile ? 0 : 2, my: isMobile ? 2 : 0 }}
            flexItem
            orientation={isMobile ? 'horizontal' : 'vertical'}
          />

          <Grid2 size={isMobile ? 12 : 5}>
            <ModalContentSectionTitle>Attempt</ModalContentSectionTitle>
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

function ModalContentSectionTitle(props: PropsWithChildren) {
  return (
    <Typography
      variant='subtitle1'
      sx={{ mb: 1 }}>
      {props.children}
    </Typography>
  );
}
