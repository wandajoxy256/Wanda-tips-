export type UserProfile = {
  id: string;
  name: string;
  email: string;
  plan?: string;
  bankroll?: number;
  favoriteLeague?: string;
};

export type AuthResponse = {
  token: string;
  user: UserProfile;
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
