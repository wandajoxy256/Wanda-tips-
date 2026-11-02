export type UserProfile = {
  id: string;
  name: string;
  email: string;
  plan: string;
  favoriteLeague: string;
  bankroll: number;
};

export type MatchFixture = {
  home: string;
  away: string;
  o1: number;
  o2: number;
  over: number;
  league: string;
};

export type PredictionResult = {
  id: string;
  league: string;
  fixture: string;
  pick: string;
  stakePercent: number;
  stakeAmount: number;
  confidence: number;
  details: string;
};
