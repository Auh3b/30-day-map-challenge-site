import usePageStore from '@storesusePageStore';
import { useEffect } from 'react';

import MAP_CHALLENGE_DATA from 'data/30_day_map_challenge_details.json';

const CHALLENGE_DATA_URL =
  'https://raw.githubusercontent.com/Auh3b/30-day-map-challenge-data/refs/heads/main/outline.json';

async function fetchChallengeData() {
  const res = await fetch(CHALLENGE_DATA_URL);
  const req = await res.json();
  return req;
}

export default function useChallengeData() {
  const { date, setChallengeData, setDayChallengeInfo } = usePageStore(
    (state) => state,
  );

  useEffect(() => {
    fetchChallengeData()
      .then((data) => {
        setChallengeData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setDayChallengeInfo(MAP_CHALLENGE_DATA[date]);
  }, [date]);
}
