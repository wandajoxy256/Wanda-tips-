export type MarketName = 'Home Win (1)' | 'Away Win (2)' | 'Over 2.5 Goals' | 'Double Chance [1X]';

export type MatchFixture = {
  home: string;
  away: string;
  o1: number;
  o2: number;
  over: number;
  league?: string;
};

export type Market = {
  name: MarketName;
  prob: number;
  odds: number;
};

export type PredictionResult = {
  league: string;
  fixture: string;
  pick: string;
  stakePercent: number;
  stakeAmount: number;
  confidence: number;
  details: string;
};
