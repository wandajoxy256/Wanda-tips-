import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../context/AppContext';
import ResultsPanel from '../components/ResultsPanel';

export default function ResultsScreen() {
  const { results, bankroll } = useAppContext();

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
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#d9d9d9',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
});
