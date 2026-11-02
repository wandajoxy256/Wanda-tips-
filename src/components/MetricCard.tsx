import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MetricCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

export default function MetricCard({ label, value, accent = false }: MetricCardProps) {
  return (
    <View style={[styles.card, accent && styles.accentCard]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accent && styles.accentText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 14,
    minHeight: 90,
    justifyContent: 'center',
  },
  accentCard: {
    backgroundColor: '#143f35',
    borderColor: '#00ffcc',
  },
  label: {
    color: '#9ad9c8',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 6,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  accentText: {
    color: '#00ffcc',
  },
});
