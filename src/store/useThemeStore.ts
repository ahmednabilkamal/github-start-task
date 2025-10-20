import { create } from 'zustand';

import { useAppStore } from './useAppStore';
import { darkTheme, lightTheme } from '../theme/theme';

export const useThemeStore = create(() => {
  const { theme } = useAppStore.getState();
  const colors = theme === 'light' ? lightTheme.colors : darkTheme.colors;
  return { colors };
});
