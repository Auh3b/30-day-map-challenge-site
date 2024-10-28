import { DayChallenge } from 'types/data';
import { create } from 'zustand';

interface PageStore {
  date: number;
  theme: 'light' | 'dark';
  dayChallenge: DayChallenge | null;
  setDate: (value: number) => void;
  setTheme: (value: 'light' | 'dark') => void;
  setDayChallengeInfo: (value: DayChallenge) => void;
}

const usePageStore = create<PageStore>((set) => ({
  date: 1,
  dayChallenge: null,
  theme: 'light',
  setDate: (value) => set(() => ({ date: value })),
  setTheme: (value) => set(() => ({ theme: value })),
  setDayChallengeInfo: (value) => set({ dayChallenge: value }),
}));

export default usePageStore;
