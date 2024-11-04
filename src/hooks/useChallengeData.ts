import usePageStore from '@storesusePageStore';
import { useEffect } from 'react';

const CHALLENGE_DATA_URL =
  'https://raw.githubusercontent.com/Auh3b/30-day-map-challenge-data/refs/heads/main/outline.json';

async function fetchChallengeData() {
  const res = await fetch(CHALLENGE_DATA_URL);
  const req = await res.json();
  return req;
}

export default function useChallengeData() {
  const setChallengeData = usePageStore((state) => state.setChallengeData);

  useEffect(() => {
    fetchChallengeData()
      .then((data) => setChallengeData(data))
      .catch((error) => console.log(error));
  }, []);
}
