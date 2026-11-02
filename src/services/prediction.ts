import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PredictionResult } from '../types';

export const formatCurrency = (value: number) => `${value.toLocaleString()} units`;

export const buildPredictionResults = (bankroll: number, selectedLeague: string) => {
  const fixtures = {
    ALL: [
      { home: 'Arsenal', away: 'Chelsea', o1: 2.1, o2: 3.2, over: 1.85 },
      { home: 'Real Madrid', away: 'Barcelona', o1: 2.0, o2: 3.1, over: 1.8 },
      { home: 'Juventus', away: 'Inter Milan', o1: 2.2, o2: 3.1, over: 1.9 },
    ],
    EPL: [
      { home: 'Arsenal', away: 'Chelsea', o1: 2.1, o2: 3.2, over: 1.85 },
      { home: 'Newcastle United', away: 'Everton FC', o1: 2.3, o2: 3.0, over: 1.75 },
    ],
    LaLiga: [
      { home: 'Real Madrid', away: 'Barcelona', o1: 2.0, o2: 3.1, over: 1.8 },
      { home: 'Atletico Madrid', away: 'Sevilla', o1: 1.95, o2: 3.3, over: 1.7 },
    ],
    SerieA: [
      { home: 'Juventus', away: 'Inter Milan', o1: 2.2, o2: 3.1, over: 1.9 },
      { home: 'AC Milan', away: 'Napoli', o1: 2.1, o2: 3.0, over: 1.75 },
    ],
  };

  const target = selectedLeague === 'ALL' ? fixtures.ALL : fixtures[selectedLeague as keyof typeof fixtures] || fixtures.ALL;

  return target.map((fixture) => {
    const estimatedHomeWin = 0.38;
    const estimatedAwayWin = 0.3;
    const estimatedOver = 0.58;
    const pick = estimatedOver > 0.5 ? 'Over 2.5 Goals' : 'Home Win (1)';
    const stakePercent = estimatedOver > 0.5 ? 2.4 : 1.8;
    const stakeAmount = bankroll * (stakePercent / 100);

    return {
      league: selectedLeague,
      fixture: `${fixture.home} vs ${fixture.away}`,
      pick,
      stakePercent,
      stakeAmount,
      confidence: estimatedOver > 0.5 ? 74.8 : 71.2,
      details: `Suggested stake: ${stakePercent.toFixed(1)}% / ${Math.round(stakeAmount).toLocaleString()} units`,
    } as PredictionResult;
  });
};

export const theme = {
  background: '#121212',
  card: '#1a1a1a',
  panel: '#181818',
  green: '#00ffcc',
  accent: '#00b33c',
  blue: '#007acc',
  white: '#ffffff',
  muted: '#a1a1a1',
};

export default function DemoThemePreview() {
  return (
    <View style={{ backgroundColor: theme.background, padding: 16 }}>
      <Text style={{ color: theme.green }}>Wanda Tips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
});
