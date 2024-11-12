import useDayChallenge from '@hooks/useDayChallenge';
import useMapLayer from '@hooks/useMapLayer';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

const day = 5;

export default function Day5() {
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

  return <Fragment></Fragment>;
}
