import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import BankrollCard from '../components/BankrollCard';
import LeaguePicker from '../components/LeaguePicker';
import ResultsPanel from '../components/ResultsPanel';
import { buildPredictionResults } from '../services/prediction';

export default function HomeScreen() {
  const { bankroll, selectedLeague, setResults, results } = useAppContext();

  useEffect(() => {
    const generated = buildPredictionResults(bankroll, selectedLeague);
    setResults(generated);
  }, [bankroll, selectedLeague]);

  const handleScan = () => {
    Alert.alert('Feasible Market Scan', `Bankroll: ${bankroll.toLocaleString()} units`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>WANDA TIPS</Text>

      <BankrollCard onSetPreset={(value) => console.log('preset', value)} />
      <LeaguePicker />

      <Pressable style={styles.primaryButton} onPress={handleScan}>
        <Text style={styles.primaryButtonText}>Run Feasible Market Scan</Text>
      </Pressable>

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
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    color: '#00ffcc',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
