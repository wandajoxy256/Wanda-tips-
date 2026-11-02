import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PredictionResult } from '../types';

type Props = {
  results: PredictionResult[];
};

export default function ResultsPanel({ results }: Props) {
  return (
    <View style={styles.container}>
      {results.length === 0 ? (
        <Text style={styles.emptyText}>Wanda Tips ready. Run a scan or analyze a screenshot.</Text>
      ) : (
        results.map((item, index) => (
          <View key={`${item.fixture}-${index}`} style={styles.resultCard}>
            <Text style={styles.league}>{item.league}</Text>
            <Text style={styles.fixture}>{item.fixture}</Text>
            <Text style={styles.pick}>Best pick: {item.pick}</Text>
            <Text style={styles.details}>{item.details}</Text>
            <Text style={styles.meta}>Confidence: {item.confidence.toFixed(1)}%</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#282828',
    minHeight: 120,
  },
  emptyText: {
    color: '#c4c4c4',
    fontSize: 14,
    lineHeight: 22,
  },
  resultCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2c2c2c',
  },
  league: {
    color: '#00ffcc',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  fixture: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  pick: {
    color: '#00ff66',
    fontWeight: '700',
    marginBottom: 4,
  },
  details: {
    color: '#d6d6d6',
    fontSize: 13,
    marginBottom: 4,
  },
  meta: {
    color: '#a5a5a5',
    fontSize: 12,
  },
});
