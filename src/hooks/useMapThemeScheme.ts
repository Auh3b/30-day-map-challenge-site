import { useColorScheme } from '@mui/material';
import usePageStore from '@storesusePageStore';
import { useCallback } from 'react';
import { MAP_STYLE_NAMES } from 'styles/mapStyles';

export default function useMapThemeScheme() {
  const { mode, setMode } = useColorScheme();
  const setTheme = usePageStore((state) => state.setTheme);
  const getThemeChanger = useCallback(() => {
    if (!mode)
      return () => {
        setMode(MAP_STYLE_NAMES.DARK);
        setTheme(MAP_STYLE_NAMES.DARK);
      };

    if (mode === MAP_STYLE_NAMES.DARK) {
      return () => {
        setMode(MAP_STYLE_NAMES.LIGHT);
        setTheme(MAP_STYLE_NAMES.LIGHT);
      };
    }
    return () => {
      setMode(MAP_STYLE_NAMES.DARK);
      setTheme(MAP_STYLE_NAMES.DARK);
    };
  }, [mode]);

  return { mode, getThemeChanger };
}
