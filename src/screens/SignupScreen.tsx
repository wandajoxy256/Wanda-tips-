import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { registerUser } from '../services/api';

export default function SignupScreen() {
  const navigation = useNavigation<any>();
  const { login } = useAppContext();
  const [name, setName] = useState('Wanda User');
  const [email, setEmail] = useState('newuser@wandatips.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields', 'Please complete all fields.');
      return;
    }

    try {
      setLoading(true);
      const auth = await registerUser(name.trim(), email.trim(), password);
      await login(auth.user, auth.token);
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

        <Pressable style={styles.primaryButton} onPress={handleSignup} disabled={loading}>
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
    fontSize: 30,
    fontWeight: '900',
    color: '#00ffcc',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderRadius: 16,
    borderColor: '#2c2c2c',
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: '#00ffcc',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    borderColor: '#00ffcc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#00ffcc',
    fontWeight: '700',
  },
});
