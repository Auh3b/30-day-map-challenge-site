import { extent } from 'd3';

export function getRange<T, K>(data: Array<T>, column: K) {
  return extent(data, (d) => d[column]);
}
