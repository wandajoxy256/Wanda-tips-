import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppContext } from '../context/AppContext';

const leagues = ['ALL', 'EPL', 'LaLiga', 'SerieA'];

export default function LeaguePicker() {
  const { selectedLeague, setSelectedLeague } = useAppContext();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Active League Scope</Text>
      <View style={styles.row}>
        {leagues.map((league) => {
          const active = selectedLeague === league;
          return (
            <Pressable
              key={league}
              onPress={() => setSelectedLeague(league)}
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
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  label: {
    color: '#00ffcc',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    marginRight: 8,
    marginBottom: 8,
  },
  activeChip: {
    backgroundColor: '#00ffcc',
    borderColor: '#00ffcc',
  },
  chipText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  activeChipText: {
    color: '#121212',
  },
});
