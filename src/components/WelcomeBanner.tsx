import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeBanner() {
  const { user } = useAppContext();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Wanda Tips</Text>
      <Text style={styles.subtitle}>Welcome back, {user?.name || 'Coach'}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.buttonText}>Open scanner</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#132a26',
    borderWidth: 1,
    borderColor: '#00ffcc',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: '#00ffcc',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1.5,
  },
  subtitle: {
    color: '#fff',
    marginTop: 6,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
