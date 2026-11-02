import { MatchFixture } from '../types';

export const database: Record<string, MatchFixture[]> = {
  EPL: [
    { home: 'Newcastle United', away: 'Everton FC', o1: 2.3, o2: 3.02, over: 1.75, league: 'EPL' },
    { home: 'Arsenal', away: 'Chelsea', o1: 2.1, o2: 3.2, over: 1.85, league: 'EPL' },
    { home: 'Liverpool', away: 'Manchester City', o1: 2.45, o2: 2.95, over: 1.9, league: 'EPL' },
  ],
  LaLiga: [
    { home: 'Real Madrid', away: 'Barcelona', o1: 2.0, o2: 3.1, over: 1.8, league: 'LaLiga' },
    { home: 'Atletico Madrid', away: 'Sevilla', o1: 1.95, o2: 3.3, over: 1.7, league: 'LaLiga' },
  ],
  SerieA: [
    { home: 'Juventus', away: 'Inter Milan', o1: 2.2, o2: 3.1, over: 1.9, league: 'SerieA' },
    { home: 'AC Milan', away: 'Napoli', o1: 2.1, o2: 3.0, over: 1.75, league: 'SerieA' },
  ],
};

export const leagues = ['ALL', 'EPL', 'LaLiga', 'SerieA'];
