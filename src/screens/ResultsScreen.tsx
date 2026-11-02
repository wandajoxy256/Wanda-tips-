import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../context/AppContext';
import ResultsPanel from '../components/ResultsPanel';

export default function ResultsScreen() {
  const { results, bankroll } = useAppContext();

  useEffect(() => {
    console.log('Results screen loaded with', results.length, 'items');
  }, [results]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Results Dashboard</Text>
      <Text style={styles.subtitle}>Bankroll: {bankroll.toLocaleString()} units</Text>
      <ResultsPanel results={results} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    color: '#d7d7d7',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
});
