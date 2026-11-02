import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../context/AppContext';
import ResultsPanel from '../components/ResultsPanel';

export default function ResultsScreen() {
  const { results, bankroll } = useAppContext();

  useEffect(() => {
    console.log('Results screen loaded');
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
    flexGrow: 1,
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
});
