import { extent } from 'd3';

export function getRangeFromObjectArray<T = { [k: string]: string | number }>(
  data: Array<T>,
  column: keyof T,
) {
  // @ts-expect-error
  return getRange(data, column);
}

export function getRange<T = number>(data: Array<T>, column?: string) {
  if (column) return extent(data, (d) => d[column]);
  // @ts-expect-error
  return extent(data);
}
