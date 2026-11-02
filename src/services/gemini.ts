import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const predictionStyles = StyleSheet.create({
  title: {
    color: '#00ffcc',
    fontWeight: '700',
    fontSize: 16,
  },
  box: {
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 12,
  },
});

export default function PredictionPreview() {
  return (
    <View style={predictionStyles.box}>
      <Text style={predictionStyles.title}>Prediction Engine</Text>
    </View>
  );
}
