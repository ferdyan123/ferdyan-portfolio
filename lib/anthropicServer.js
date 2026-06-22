// lib/anthropicServer.js
// Helper server-side untuk call Claude API. JANGAN import ini di file 'use client'.

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function callClaude({ apiKey, system, messages, maxTokens = 1024 }) {
  if (!apiKey) {
    throw new Error('Claude API key belum diset');
  }

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    const err = new Error(`Anthropic API error (${res.status}): ${errText}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const textBlock = data.content?.find((b) => b.type === 'text');
  return textBlock?.text || '';
}