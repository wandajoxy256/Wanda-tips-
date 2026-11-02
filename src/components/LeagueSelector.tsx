import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppContext } from '../context/AppContext';

const leagueOptions = ['ALL', 'EPL', 'LaLiga', 'SerieA'];

export default function LeagueSelector() {
  const { selectedLeague, setSelectedLeague } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>League scope</Text>
      <View style={styles.row}>
        {leagueOptions.map((league) => {
          const active = selectedLeague === league;
          return (
            <Pressable
              key={league}
              onPress={async () => {
                await setSelectedLeague(league);
              }}
              style={[styles.chip, active && styles.activeChip]}
            >
              <Text style={[styles.chipText, active && styles.activeChipText]}>{league}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#00ffcc',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#242424',
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  activeChip: {
    backgroundColor: '#00ffcc',
    borderColor: '#00ffcc',
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  activeChipText: {
    color: '#111',
  },
});
