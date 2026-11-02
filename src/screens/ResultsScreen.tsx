import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import ResultsPanel from '../components/ResultsPanel';

export default function ResultsScreen() {
  const { results, bankroll } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results Dashboard</Text>
      <Text style={styles.subtitle}>Bankroll: {bankroll.toLocaleString()} units</Text>
      <ResultsPanel results={results} />

      <Pressable style={styles.actionButton} onPress={() => Alert.alert('Saved', 'Results are saved locally in the app.') }>
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
