import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../context/AppContext';
import { analyzeImageWithGemini } from '../services/gemini';

export default function ScanScreen() {
  const { apiKey, setApiKey, bankroll } = useAppContext();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Missing API key', 'Paste your Gemini API key before analyzing a screenshot.');
      return;
    }

    if (!imageUri) {
      Alert.alert('No screenshot', 'Select an image before scanning.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      const base64 = globalThis.btoa ? globalThis.btoa(binary) : '';

      const text = await analyzeImageWithGemini(base64, blob.type || 'image/jpeg', apiKey.trim());
      setAnalysisText(text);
      Alert.alert('AI analysis complete', `Bankroll: ${bankroll.toLocaleString()} units`);
    } catch (error: any) {
      Alert.alert('Analysis failed', error.message || 'Unable to process screenshot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vision AI Engine</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Gemini API Key</Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Paste your Gemini API key"
          placeholderTextColor="#6b6b6b"
          secureTextEntry
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Upload match screenshot</Text>
        <Pressable style={styles.primaryButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose image</Text>
        </Pressable>

        {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" /> : null}

        <Pressable style={styles.secondaryButton} onPress={handleAnalyze} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Analyzing...' : 'Scan screenshot with AI'}</Text>
        </Pressable>
      </View>

      {analysisText ? (
        <View style={styles.analysisBox}>
          <Text style={styles.analysisText}>{analysisText}</Text>
        </View>
      ) : null}
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
    borderRadius: 14,
    borderColor: '#2a2a2a',
    borderWidth: 1,
    padding: 16,
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
    backgroundColor: '#262626',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
  },
  primaryButton: {
    backgroundColor: '#007acc',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 14,
    backgroundColor: '#171717',
  },
  analysisBox: {
    borderRadius: 12,
    backgroundColor: '#181818',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    padding: 12,
  },
  analysisText: {
    color: '#00ff66',
    fontSize: 14,
    lineHeight: 22,
  },
});
