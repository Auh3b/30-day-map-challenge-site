import usePageStore from '@storesusePageStore';
import MapChallengeData from 'data/30_day_map_challenge_details.json';
import { useMemo } from 'react';

export default function useDayChallenge() {
  const { setDayChallengeInfo, challengeData, dayChallenge } = usePageStore(
    (state) => state,
  );

  const setDayChallenge = (value: number) => {
    setDayChallengeInfo(MapChallengeData[value]);
  };

  const isDayChallengeReady = useMemo(
    () => Boolean(challengeData && dayChallenge),
    [challengeData, dayChallenge],
  );

  return {
    challengeData,
    isDayChallengeReady,
    setDayChallenge,
  };
}
