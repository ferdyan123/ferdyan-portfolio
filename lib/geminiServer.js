// lib/geminiServer.js
// Helper server-side untuk call Gemini API. JANGAN import ini di file 'use client'.

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function callGemini({ apiKey, system, messages, maxTokens = 1024 }) {
  if (!apiKey) {
    throw new Error('Gemini API key belum diset');
  }

  // Gemini gak punya role "system" terpisah seperti Claude, jadi kita
  // gabungkan system prompt sebagai instruksi di awal contents.
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    const err = new Error(`Gemini API error (${res.status}): ${errText}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text;
}