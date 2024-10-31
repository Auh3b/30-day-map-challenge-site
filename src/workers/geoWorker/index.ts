import { WorkerFunc, WorkerMethod, WorkerParams } from 'types/funcs';
import { wrap } from 'comlink';

const GeoWorker = new Worker(new URL('./execute.ts', import.meta.url), {
  type: 'module',
  name: 'geoWorker',
});

const execute = wrap<WorkerFunc>(GeoWorker);

export default async function executeGeoWorker(
  method: WorkerMethod,
  params?: WorkerParams,
) {
  const { result, status, message } = await execute(method, params);

  return {
    result,
    status,
    message,
  };
}
