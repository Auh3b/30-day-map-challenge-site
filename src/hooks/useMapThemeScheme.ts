import { useColorScheme } from '@mui/material';
import usePageStore from '@storesusePageStore';
import { useCallback } from 'react';
import { MAP_STYLE_NAMES } from 'styles/mapStyles';

export default function useMapThemeScheme() {
  const { mode, setMode } = useColorScheme();
  const setBasemapUrl = usePageStore((state) => state.setTheme);
  const getThemeChanger = useCallback(() => {
    if (!mode)
      return () => {
        setMode(MAP_STYLE_NAMES.DARK);
        setBasemapUrl(MAP_STYLE_NAMES.DARK);
      };

    if (mode === MAP_STYLE_NAMES.DARK) {
      return () => {
        setMode(MAP_STYLE_NAMES.LIGHT);
        setBasemapUrl(MAP_STYLE_NAMES.LIGHT);
      };
    }
    return () => {
      setMode(MAP_STYLE_NAMES.DARK);
      setBasemapUrl(MAP_STYLE_NAMES.DARK);
    };
  }, [mode]);

  return { mode, getThemeChanger };
}
