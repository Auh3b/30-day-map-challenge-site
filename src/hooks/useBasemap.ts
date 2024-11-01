import useMapStore from '@storesuseMapStore';
import usePageStore from '@storesusePageStore';
import { useEffect } from 'react';
import { MAP_STYLES } from 'styles/mapStyles';

const mapStyles = MAP_STYLES;

export default function useBasemap() {
  const setBasemapUrl = useMapStore((state) => state.setBasemapUrl);
  const mode = usePageStore((state) => state.theme);

  useEffect(() => {
    const newUrl = mapStyles[mode] || mapStyles['dark'];
    setBasemapUrl(newUrl);
  }, [mode]);
}
