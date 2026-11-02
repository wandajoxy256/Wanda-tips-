import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { fetchLeagueFixtures } from '../services/api';
import { buildPredictionResults } from '../services/prediction';

export default function HomeScreen() {
  const { bankroll, selectedLeague, setResults, results, token, user } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runPrediction = async () => {
      try {
        setLoading(true);
        const fixtures = await fetchLeagueFixtures(selectedLeague, token ?? undefined);
        const mapped = fixtures.length ? fixtures : buildPredictionResults(bankroll, selectedLeague);
        await setResults(mapped);
      } catch (error) {
        const fallback = buildPredictionResults(bankroll, selectedLeague);
        await setResults(fallback);
      } finally {
        setLoading(false);
      }
    };

    runPrediction();
  }, [bankroll, selectedLeague, token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.name ?? 'Coach'}</Text>
      <Text style={styles.title}>WANDA TIPS</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Bankroll</Text>
        <Text style={styles.summaryValue}>{bankroll.toLocaleString()} units</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>League</Text>
        <Text style={styles.summaryValue}>{selectedLeague}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => Alert.alert('Scan run', `Feasible market scan ready for ${selectedLeague}`)}>
        <Text style={styles.primaryButtonText}>{loading ? 'Scanning...' : 'Run Feasible Market Scan'}</Text>
      </Pressable>

      <View style={styles.resultsCard}>
        <Text style={styles.cardTitle}>Top recommendations</Text>
        {results.length === 0 ? (
          <Text style={styles.emptyText}>No picks yet. Click the scan button to generate recommendations.</Text>
        ) : (
          results.slice(0, 3).map((item, index) => (
            <View key={`${item.fixture}-${index}`} style={styles.pickRow}>
              <Text style={styles.fixtureText}>{item.fixture}</Text>
              <Text style={styles.pickText}>{item.pick}</Text>
              <Text style={styles.pickInfo}>{item.details}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  greeting: {
    color: '#d9d9d9',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    color: '#00ffcc',
    letterSpacing: 2,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#7deed0',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 6,
  },
  summaryValue: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  resultsCard: {
    backgroundColor: '#191919',
    borderColor: '#2b2b2b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    color: '#00ffcc',
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyText: {
    color: '#d0d0d0',
    lineHeight: 22,
  },
  pickRow: {
    backgroundColor: '#232323',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  fixtureText: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 4,
  },
  pickText: {
    color: '#00ff66',
    fontWeight: '800',
    marginBottom: 4,
  },
  pickInfo: {
    color: '#d7d7d7',
    fontSize: 12,
  },
});
