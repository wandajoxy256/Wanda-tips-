import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';

export default function HistoryScreen() {
  const { results } = useAppContext();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const value = await AsyncStorage.getItem('@wanda:history');
      setHistory(value ? JSON.parse(value) : results.slice(0, 3));
    };

    loadHistory();
  }, [results]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scan History</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>No saved history yet.</Text>
      ) : (
        history.map((item, index) => (
          <View key={`${item.fixture}-${index}`} style={styles.card}>
            <Text style={styles.league}>{item.league}</Text>
            <Text style={styles.fixture}>{item.fixture}</Text>
            <Text style={styles.pick}>{item.pick}</Text>
          </View>
        ))
      )}
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
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
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
    fontWeight: '700',
    marginBottom: 4,
  },
  pick: {
    color: '#00ff66',
    fontWeight: '700',
  },
  empty: {
    color: '#d0d0d0',
  },
});
