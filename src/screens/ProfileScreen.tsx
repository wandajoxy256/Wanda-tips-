import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, bankroll, logout, updateProfile } = useAppContext();

  const handleAddUnits = async () => {
    const updatedBankroll = bankroll + 100;
    await updateProfile({ bankroll: updatedBankroll });
    Alert.alert('Profile updated', `Your bankroll is now ${updatedBankroll.toLocaleString()} units.`);
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name ?? 'Wanda User'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? 'demo@wandatips.com'}</Text>

        <Text style={styles.label}>Bankroll</Text>
        <Text style={styles.value}>{bankroll.toLocaleString()} units</Text>

        <Text style={styles.label}>Plan</Text>
        <Text style={styles.value}>{user?.plan ?? 'Pro'}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={handleAddUnits}>
        <Text style={styles.primaryButtonText}>Add 100 units</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleLogout}>
        <Text style={styles.secondaryButtonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    color: '#00ffcc',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    borderColor: '#2a2a2a',
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: '#00ffcc',
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#202020',
    borderWidth: 1,
    borderColor: '#00ffcc',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  secondaryButtonText: {
    color: '#00ffcc',
    fontWeight: '700',
  },
});
