import React from 'react';
import { View, Text } from 'react-native';

export async function analyzeImageWithGemini(base64Image: string, mimeType: string, apiKey: string) {
  const prompt = 'Analyze this football screenshot. Extract team names, odds, and provide a concise prediction summary. Return plain text.';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Image } },
          ],
        }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini request failed');
    }

    const text = data?.candidates?.[0]?.content?.parts?.find((part: any) => part.text)?.text;
    return text || 'Vision analysis completed successfully.';
  } catch (error: any) {
    throw new Error(error.message || 'Gemini analysis failed');
  }
}

export default function GeminiPreview() {
  return (
    <View>
      <Text>Gemini API</Text>
    </View>
  );
}
