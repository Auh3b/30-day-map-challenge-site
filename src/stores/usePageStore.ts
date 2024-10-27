import { create } from 'zustand';

interface PageStore {
  date: number;
  theme: 'light' | 'dark';
  setDate: (value: number) => void;
  setTheme: (value: 'light' | 'dark') => void;
}

const usePageStore = create<PageStore>((set) => ({
  date: 1,
  theme: 'light',
  setDate: (value) => set(() => ({ date: value })),
  setTheme: (value) => set(() => ({ theme: value })),
}));

export default usePageStore;
