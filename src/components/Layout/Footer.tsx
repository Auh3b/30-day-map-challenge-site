import useDayChallenge from '@hooks/useDayChallenge';
import { Grid2 as Grid, Paper, styled, Tab, Tabs } from '@mui/material';
import { orange } from '@mui/material/colors';
import { range } from 'd3';
import { SyntheticEvent } from 'react';
import usePageStore from 'stores/usePageStore';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: orange[500],
  },
}));

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.MuiTab-root': {
    minWidth: `${theme.spacing(2)}`,
    padding: `8px 12px`,
  },
  // color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    // color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function Footer() {
  return (
    <Grid sx={{ p: 2, maxWidth: { md: 1200, lg: 'unset' } }}>
      <DateSelectorWrapper />
    </Grid>
  );
}

function DateSelectorWrapper() {
  return (
    <Paper
      sx={{ mx: 'auto', width: '100%' }}
      elevation={10}
      variant={'elevation'}>
      <DateSelectorRange />
    </Paper>
  );
}

function DateSelectorRange() {
  const dates = range(1, 31);

  const { date, setDate } = usePageStore((state) => state);

  const { setDayChallenge } = useDayChallenge();

  const handleChange = (_e: SyntheticEvent, value: number) => {
    setDate(value);
    setDayChallenge(value);
  };

  return (
    <StyledTabs
      variant={'scrollable'}
      scrollButtons='auto'
      value={date}
      onChange={handleChange}>
      {dates.map((d) => (
        <StyledTab
          key={d}
          value={d}
          label={d.toString()}
        />
      ))}
    </StyledTabs>
  );
}
