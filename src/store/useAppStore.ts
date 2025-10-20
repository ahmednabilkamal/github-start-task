import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import moment from 'moment';

import { storage } from '../storage/mmkv';
import { AppState } from '../types/types';

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      top: 50,
      language: 'TypeScript',
      createdFrom: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      theme: 'light',
      setTop: t => set({ top: t }),
      setLanguage: lang => set({ language: lang }),
      setCreatedFrom: cForm => set({ createdFrom: cForm }),
      toggleTheme: () =>
        set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => storage.set(name, value),
        getItem: name => storage.getString(name) ?? null,
        removeItem: name => storage.delete(name),
      })),
    },
  ),
);
