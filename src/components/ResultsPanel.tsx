import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function ResultsPanel({ results }: { results: any[] }) {
  return (
    <View style={styles.container}>
      {results.length === 0 ? (
        <Text style={styles.emptyText}>Wanda Tips ready. Run a scan or analyze a screenshot.</Text>
      ) : (
        results.map((item, index) => (
          <View key={`${item.fixture}-${index}`} style={styles.card}>
            <Text style={styles.league}>{item.league}</Text>
            <Text style={styles.fixture}>{item.fixture}</Text>
            <Text style={styles.pick}>Best pick: {item.pick}</Text>
            <Text style={styles.details}>{item.details}</Text>
            <Text style={styles.meta}>Confidence: {item.confidence.toFixed ? item.confidence.toFixed(1) : item.confidence}%</Text>
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
    borderColor: '#2a2a2a',
    borderWidth: 1,
    padding: 12,
    minHeight: 120,
  },
  emptyText: {
    color: '#d3d3d3',
    fontSize: 14,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2f2f2f',
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
    color: '#d7d7d7',
    fontSize: 13,
    marginBottom: 4,
  },
  meta: {
    color: '#a5a5a5',
    fontSize: 12,
  },
});
