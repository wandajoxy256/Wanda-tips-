import { MatchFixture, PredictionResult } from '../types';

export const fixturesByLeague: Record<string, MatchFixture[]> = {
  ALL: [
    { home: 'Arsenal', away: 'Chelsea', o1: 2.1, o2: 3.2, over: 1.85, league: 'ALL' },
    { home: 'Real Madrid', away: 'Barcelona', o1: 2.0, o2: 3.1, over: 1.8, league: 'ALL' },
    { home: 'Juventus', away: 'Inter Milan', o1: 2.2, o2: 3.1, over: 1.9, league: 'ALL' },
  ],
  EPL: [
    { home: 'Arsenal', away: 'Chelsea', o1: 2.1, o2: 3.2, over: 1.85, league: 'EPL' },
    { home: 'Newcastle United', away: 'Everton FC', o1: 2.3, o2: 3.0, over: 1.75, league: 'EPL' },
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

export function buildPredictionResults(bankroll: number, selectedLeague: string): PredictionResult[] {
  const leagueKey = selectedLeague === 'ALL' ? 'ALL' : selectedLeague;
  const fixtures = fixturesByLeague[leagueKey] ?? fixturesByLeague.ALL;

  return fixtures.map((fixture, index) => {
    const estimatedOver = 0.58;
    const stakePercent = estimatedOver > 0.5 ? 2.4 : 1.8;
    const stakeAmount = bankroll * (stakePercent / 100);
    const pick = estimatedOver > 0.5 ? 'Over 2.5 Goals' : 'Home Win (1)';

    return {
      id: `${fixture.home}-${fixture.away}-${index}`,
      league: fixture.league,
      fixture: `${fixture.home} vs ${fixture.away}`,
      pick,
      stakePercent,
      stakeAmount,
      confidence: estimatedOver > 0.5 ? 74.8 : 71.2,
      details: `Suggested stake: ${stakePercent.toFixed(1)}% / ${Math.round(stakeAmount).toLocaleString()} units`,
    };
  });
}
