import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { fetchLeagueFixtures } from '../services/api';
import { buildPredictionResults } from '../services/prediction';

export default function HomeScreen() {
  const { bankroll, selectedLeague, setResults, results, token, user } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const fixtures = await fetchLeagueFixtures(selectedLeague, token ?? undefined);
        await setResults(fixtures.length > 0 ? fixtures : buildPredictionResults(bankroll, selectedLeague));
      } catch (error) {
        await setResults(buildPredictionResults(bankroll, selectedLeague));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [bankroll, selectedLeague, token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.name || 'Coach'}</Text>
      <Text style={styles.title}>WANDA TIPS</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bankroll</Text>
        <Text style={styles.value}>{bankroll.toLocaleString()} units</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>League</Text>
        <Text style={styles.value}>{selectedLeague}</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => Alert.alert('Scan ready', `Feasible market scan ready for ${selectedLeague}`)}
      >
        <Text style={styles.primaryButtonText}>{loading ? 'Scanning...' : 'Run Feasible Market Scan'}</Text>
      </Pressable>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Top recommendations</Text>
        {results.length === 0 ? (
          <Text style={styles.emptyText}>No picks yet. Run a scan to generate results.</Text>
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
    color: '#d4d4d4',
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
  card: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    color: '#7deed0',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 6,
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginVertical: 16,
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
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
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
