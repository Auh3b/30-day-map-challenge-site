import OpacityControl from '@components/common/Map/customMapControls/OpacityControl';
import useDayChallenge from '@hooks/useDayChallenge';
import useMapLayer from '@hooks/useMapLayer';
import { Box, Paper } from '@mui/material';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

const day = 9;

export default function Day9() {
  const { handleLayerAdd, handleLayerRemove } = useMapLayer();
  const { isDayChallengeReady, challengeData } = useDayChallenge();

  useEffect(() => {
    if (isDayChallengeReady) {
      handleLayerAdd(day, {
        id: day,
        name: challengeData[day].id,
        title: challengeData[day].title,
      });
    }
    return () => {
      handleLayerRemove(day);
    };
  }, [isDayChallengeReady]);

  return (
    <Fragment>
      <Box
        zIndex={100}
        position={'absolute'}
        bottom={8}
        left={16}
        minWidth={'300px'}>
        <Paper sx={{ p: 2 }}>
          <OpacityControl layerId={day} />
        </Paper>
      </Box>
    </Fragment>
  );
}
