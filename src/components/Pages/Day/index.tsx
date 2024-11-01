import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import executeGeoWorker from 'workers/geoWorker';
import METHOD_NAMES from 'workers/geoWorker/methodNames';

export default function index() {
  const { day } = useParams();
  const dayNum = Number(day);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Auh3b/30-day-map-challenge-data/refs/heads/main/test.geojson',
    )
      .then((res) => res.json())
      .then((data) => executeGeoWorker(METHOD_NAMES.SET_DATA, { data }))
      // .then(({ result }) => console.log(result))
      .catch((error) => console.log(error));
  }, []);

  return null;
}
