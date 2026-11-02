import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export default function ResultsScreen() {
  const { results, bankroll, user } = useAppContext();

  useEffect(() => {
    const persist = async () => {
      await AsyncStorage.setItem('@wanda:history', JSON.stringify(results.slice(0, 5)));
    };

    persist();

    if (supabase && user) {
      supabase.from('predictions').insert(
        results.slice(0, 3).map((item) => ({
          user_id: user.id,
          league: item.league,
          fixture: item.fixture,
          pick: item.pick,
          stake_percent: item.stakePercent,
          stake_amount: item.stakeAmount,
          confidence: item.confidence,
          details: item.details,
        })),
      );
    }
  }, [results, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results Dashboard</Text>
      <Text style={styles.subtitle}>Bankroll: {bankroll.toLocaleString()} units</Text>

      {results.length === 0 ? (
        <Text style={styles.empty}>No results yet.</Text>
      ) : (
        results.slice(0, 4).map((item, index) => (
          <View key={`${item.fixture}-${index}`} style={styles.card}>
            <Text style={styles.league}>{item.league}</Text>
            <Text style={styles.fixture}>{item.fixture}</Text>
            <Text style={styles.pick}>{item.pick}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
        ))
      )}

      <Pressable style={styles.actionButton} onPress={() => Alert.alert('Saved', 'The latest result snapshot has been saved locally.') }>
        <Text style={styles.actionText}>Save snapshot</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    color: '#00ffcc',
    fontWeight: '900',
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#d7d7d7',
    marginBottom: 16,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  league: {
    color: '#00ffcc',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 5,
  },
  fixture: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 4,
  },
  pick: {
    color: '#00ff66',
    fontWeight: '700',
    marginBottom: 4,
  },
  details: {
    color: '#d6d6d6',
    fontSize: 12,
  },
  empty: {
    color: '#d0d0d0',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#007acc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
});
