export interface DayChallenge {
  date: string;
  description: string;
  name: string;
  day: number;
  month: number;
  year: number;
}

export type MapChallenge = DayChallenge[];

export interface MapDescription {
  poi: string;
  location: string;
  context: string;
  sources: string[];
}

export interface DayChallengeData {
  id: string;
  url: string;
  title: string;
  subject: string;
  location: string;
  description: string;
  sources: string[];
}

export interface MapChallengeData {
  [k: number]: DayChallengeData;
}
