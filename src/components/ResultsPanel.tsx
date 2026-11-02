import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PredictionResult } from '../types';

export default function ResultsPanel({ results }: { results: PredictionResult[] }) {
  return (
    <View style={styles.container}>
      {results.length === 0 ? (
        <Text style={styles.emptyText}>Wanda Tips is ready. Run a scan or load your next set of fixtures.</Text>
      ) : (
        results.map((item, index) => (
          <View key={`${item.fixture}-${index}`} style={styles.card}>
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
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 12,
    minHeight: 120,
  },
  emptyText: {
    color: '#d0d0d0',
    fontSize: 14,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2d2d2d',
  },
  league: {
    color: '#00ffcc',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
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
    color: '#d8d8d8',
    fontSize: 13,
    marginBottom: 4,
  },
  meta: {
    color: '#a8a8a8',
    fontSize: 12,
  },
});
