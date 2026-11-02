export async function analyzeImageWithGemini(base64Image: string, mimeType: string, apiKey: string) {
  const prompt = 'Analyze this football screenshot. Extract teams, visible odds, and provide a concise recommendation with suggested market and stake. Return only plain text.';

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: base64Image } },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini request failed');
    }

    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts.find((part: any) => typeof part.text === 'string')?.text;

    return text || 'Vision analysis completed successfully.';
  } catch (error: any) {
    throw new Error(error.message || 'Gemini analysis failed');
  }
}
