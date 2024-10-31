import { WorkerMethod } from 'types/funcs';
import { useState } from 'react';
import executeGeoWorker from 'workers/geoWorker';
import useCustomCompareEffect from './useCustomCompareEffect';
import { dequal } from 'dequal';
import useMapParams from './useMapParams';

export default function useGeoWorker(method: WorkerMethod) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useMapParams([]);

  useCustomCompareEffect(
    () => {
      setIsLoading(true);
      executeGeoWorker(method)
        .then(({ result, status, message }) => {
          if (!status) throw Error(message);
          setData(result);
        })
        .catch()
        .finally(() => setIsLoading(false));
    },
    [params],
    dequal,
  );

  return {
    data,
    isLoading,
  };
}
