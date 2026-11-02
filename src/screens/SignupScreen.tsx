import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api';
import { useAppContext } from '../context/AppContext';

export default function SignupScreen() {
  const navigation = useNavigation<any>();
  const { login } = useAppContext();
  const [name, setName] = useState('Wanda User');
  const [email, setEmail] = useState('newuser@wandatips.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields', 'Please complete all fields.');
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(name.trim(), email.trim(), password);
      await login(result.user, result.token);
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Signup failed', error.message || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.brand}>WANDA TIPS</Text>
      <Text style={styles.title}>Create account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#6d6d6d"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@example.com"
          placeholderTextColor="#6d6d6d"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#6d6d6d"
        />

        <Pressable style={styles.primaryButton} onPress={onSubmit} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Creating account...' : 'Sign up'}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Back to login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#121212',
  },
  brand: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 2,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderRadius: 16,
    padding: 18,
    borderColor: '#2c2c2c',
    borderWidth: 1,
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
    backgroundColor: '#262626',
    borderColor: '#353535',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#00ffcc',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00ffcc',
    fontWeight: '700',
  },
});
