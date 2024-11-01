import { WorkerParams } from 'types/funcs';
import { FeatureCollection } from 'geojson';

let data: null | FeatureCollection = null;

export function setData(params: WorkerParams) {
  data = params['data'];
  return true;
}

export function getData(params: WorkerParams) {
  if (!data) throw Error('Data not set');
  return data;
}
