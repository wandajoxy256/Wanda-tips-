export const analyzeImageWithGemini = async (base64Image: string, mimeType: string, apiKey: string) => {
  const prompt = `Analyze this football match screenshot. Extract visible teams, 1X2 odds, total goals odds, and provide a concise report with the best feasible market and recommended stake based on bankroll. Return plain text only.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Unable to analyze screenshot');
  }

  const text = data?.candidates?.[0]?.content?.parts?.find((part: any) => part.text)?.text;

  if (!text) {
    throw new Error('No analysis returned from Gemini.');
  }

  return text;
};
