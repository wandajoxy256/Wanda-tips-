import { MatchFixture } from '../types';

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

export const poisson = (lambda: number, k: number): number => {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
};

export const buildPredictionResults = (bankroll: number, selectedLeague: string) => {
  const data: Record<string, MatchFixture[]> = {
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

  const targetLeagues = selectedLeague === 'ALL' ? Object.keys(data) : [selectedLeague];

  const results = targetLeagues.flatMap((league) => {
    return (data[league] || []).map((fixture) => {
      let avgH = 1.6;
      let avgA = 1.25;
      let homeWin = 0;
      let draw = 0;
      let awayWin = 0;
      let over = 0;

      for (let h = 0; h < 6; h++) {
        for (let a = 0; a < 6; a++) {
          const p = poisson(avgH, h) * poisson(avgA, a);
          if (h > a) homeWin += p;
          else if (h === a) draw += p;
          else awayWin += p;
          if (h + a > 2.5) over += p;
        }
      }

      const markets = [
        { name: 'Home Win (1)', prob: (homeWin * 100) / 100, odds: fixture.o1 },
        { name: 'Away Win (2)', prob: (awayWin * 100) / 100, odds: fixture.o2 },
        { name: 'Over 2.5 Goals', prob: (over * 100) / 100, odds: fixture.over },
        { name: 'Double Chance [1X]', prob: ((homeWin + draw) * 100) / 100, odds: 1.35 },
      ];

      let bestPick = 'None';
      let bestStakePercent = 0;
      let bestStakeAmount = 0;
      let confidence = 0;

      markets.forEach((market) => {
        const b = market.odds - 1;
        const q = 1 - market.prob;
        const fullKelly = b > 0 ? (b * market.prob - q) / b : 0;
        const quarterKelly = Math.max(0, fullKelly * 0.25);

        const implied = (1 / market.odds) * 100;
        const edge = market.prob * 100 - implied;
        const score = market.prob * 100 + edge * 2.5;

        if (score > confidence && quarterKelly > 0) {
          confidence = score;
          bestPick = market.name;
          bestStakePercent = quarterKelly * 100;
          bestStakeAmount = bankroll * quarterKelly;
        }
      });

      return {
        league,
        fixture: `${fixture.home} vs ${fixture.away}`,
        pick: bestPick,
        stakePercent: bestStakePercent,
        stakeAmount: bestStakeAmount,
        confidence: Number(confidence.toFixed(1)),
        details: bestStakeAmount > 0 ? `Suggested stake: ${bestStakePercent.toFixed(1)}% / ${Math.round(bestStakeAmount).toLocaleString()} units` : 'No positive edge detected',
      };
    });
  });

  return results.filter((item) => item.pick !== 'None');
};
