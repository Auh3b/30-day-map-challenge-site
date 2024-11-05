import usePageStore from '@storesusePageStore';
import { useEffect } from 'react';

import MAP_CHALLENGE_DATA from 'data/30_day_map_challenge_details.json';
import { MapChallengeData } from 'types/data';
import { max } from 'd3';
import { useNavigate } from 'react-router-dom';

const CHALLENGE_DATA_URL =
  'https://raw.githubusercontent.com/Auh3b/30-day-map-challenge-data/refs/heads/main/outline.json';

async function fetchChallengeData() {
  const res = await fetch(CHALLENGE_DATA_URL);
  const req = await res.json();
  return req;
}

export default function useChallengeData() {
  const { date, setChallengeData, setDayChallengeInfo, setDate } = usePageStore(
    (state) => state,
  );
  const nav = useNavigate();

  useEffect(() => {
    fetchChallengeData()
      .then((data) => {
        setChallengeData(data);
        const day = getLatestOutlineDay(data);
        nav(day);
        setDate(+day);
        return setDayChallengeInfo(MAP_CHALLENGE_DATA[day]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setDayChallengeInfo(MAP_CHALLENGE_DATA[date]);
  }, [date]);
}

function getLatestOutlineDay(value: MapChallengeData) {
  const days = Object.keys(value);
  const latest_day = max(days);
  return latest_day;
}
