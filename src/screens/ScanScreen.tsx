import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  Image,
} from 'react-native';
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
      Alert.alert('Missing API Key', 'Add your Gemini API key in the app first.');
      return;
    }

    if (!imageUri) {
      Alert.alert('No image', 'Please select a screenshot before scanning.');
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
      Alert.alert('Vision analysis complete', `Bankroll: ${bankroll.toLocaleString()} units`);
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
          placeholderTextColor="#6d6d6d"
          secureTextEntry
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Screenshot</Text>
        <Pressable style={styles.primaryButton} onPress={pickImage}>
          <Text style={styles.primaryButtonText}>Choose image</Text>
        </Pressable>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />
        ) : null}

        <Pressable style={styles.secondaryButton} onPress={handleAnalyze} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Analyzing...' : 'Scan screenshot'}</Text>
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
    padding: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#00ffcc',
    letterSpacing: 2,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    padding: 16,
    borderColor: '#2a2a2a',
    borderWidth: 1,
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
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
  },
  primaryButton: {
    backgroundColor: '#007acc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: '#00b33c',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 14,
    backgroundColor: '#1a1a1a',
  },
  analysisBox: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  analysisText: {
    color: '#00ff66',
    fontSize: 14,
    lineHeight: 22,
  },
});
