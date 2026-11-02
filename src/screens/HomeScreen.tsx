import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { buildPredictionResults } from '../services/prediction';
import LeagueSelector from '../components/LeagueSelector';
import MetricCard from '../components/MetricCard';

export default function HomeScreen() {
  const { bankroll, selectedLeague, results, setResults, token, user } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const nextResults = buildPredictionResults(bankroll, selectedLeague);
        await setResults(nextResults);
      } catch (error) {
        console.warn('Unable to refresh results', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [bankroll, selectedLeague]);

  const topPick = results[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.name || 'Coach'}</Text>
      <Text style={styles.title}>WANDA TIPS</Text>

      <View style={styles.metricRow}>
        <MetricCard label="Bankroll" value={`${bankroll.toLocaleString()} units`} />
        <MetricCard label="Best pick" value={topPick ? topPick.pick : 'N/A'} accent />
      </View>

      <LeagueSelector />

      <Pressable style={styles.primaryButton} onPress={() => Alert.alert('Market scan', `Feasible market scan ready for ${selectedLeague}`)}>
        <Text style={styles.primaryButtonText}>{loading ? 'Scanning...' : 'Run Feasible Market Scan'}</Text>
      </Pressable>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Today’s top picks</Text>
        {results.length === 0 ? (
          <Text style={styles.emptyText}>No picks yet. Start your scan to generate recommendations.</Text>
        ) : (
          results.slice(0, 3).map((item, index) => (
            <View key={`${item.fixture}-${index}`} style={styles.pickBox}>
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  greeting: {
    color: '#d7d7d7',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    color: '#00ffcc',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 18,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2b2b2b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    color: '#00ffcc',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1,
  },
  emptyText: {
    color: '#d0d0d0',
    lineHeight: 22,
  },
  pickBox: {
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
    color: '#d6d6d6',
    fontSize: 12,
  },
});
