export interface DayChallenge {
  date: string;
  description: string;
  name: string;
  day: number;
  month: number;
  year: number;
}

export type MapChallenge = DayChallenge[];
