import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

type BankrollCardProps = {
  onSetPreset: (value: number) => void;
};

const presets = [500, 1000, 5000, 50000];

export default function BankrollCard({ onSetPreset }: BankrollCardProps) {
  const { bankroll, setBankroll } = useAppContext();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Starting Bankroll</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(bankroll)}
        onChangeText={(text) => {
          const numeric = Number(text) || 0;
          setBankroll(numeric > 0 ? numeric : 1000);
        }}
        placeholder="Enter bankroll"
        placeholderTextColor="#6a6a6a"
      />

      <View style={styles.presetRow}>
        {presets.map((preset) => (
          <Pressable
            key={preset}
            onPress={() => {
              onSetPreset(preset);
              setBankroll(preset);
            }}
            style={styles.presetButton}
          >
            <Text style={styles.presetText}>{preset.toLocaleString()}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  label: {
    color: '#00ffcc',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  presetButton: {
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#00ffcc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  presetText: {
    color: '#00ffcc',
    fontWeight: '700',
    fontSize: 12,
  },
});
