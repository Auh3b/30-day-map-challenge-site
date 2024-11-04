import usePageStore from '@storesusePageStore';

export default function useMapVisibility(value: number) {
  const date = usePageStore((state) => state.date);
  return value === date;
}
