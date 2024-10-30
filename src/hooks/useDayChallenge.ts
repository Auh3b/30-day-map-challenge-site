import usePageStore from '@storesusePageStore';
import MapChallengeData from 'data/30_day_map_challenge_details.json';

export default function useDayChallenge() {
  const setDayChallengeInfo = usePageStore(
    (state) => state.setDayChallengeInfo,
  );

  const setDayChallenge = (value: number) => {
    setDayChallengeInfo(MapChallengeData[value]);
  };

  return {
    setDayChallenge,
  };
}
