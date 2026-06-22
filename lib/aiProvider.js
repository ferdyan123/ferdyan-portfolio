// lib/aiProvider.js
import { callClaude } from './anthropicServer';
import { callGemini } from './geminiServer';
import { supabaseAdmin } from './supabaseServer';

export async function getStoredKeys() {
  const { data, error } = await supabaseAdmin.from('ai_settings').select('id, api_key');
  if (error) {
    console.error('Gagal ambil ai_settings:', error);
    return { claude: process.env.ANTHROPIC_API_KEY, gemini: process.env.GEMINI_API_KEY };
  }
  const map = {};
  data.forEach((row) => {
    map[row.id] = row.api_key || (row.id === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.GEMINI_API_KEY);
  });
  return map;
}

function isRateLimitError(err) {
  return err?.status === 429;
}

// Coba provider utama, kalau kena rate limit (429) otomatis coba provider kedua.
// primary default 'claude', fallback ke 'gemini'.
export async function callAIWithFallback({ system, messages, maxTokens, primary = 'claude' }) {
  const keys = await getStoredKeys();
  const order = primary === 'gemini' ? ['gemini', 'claude'] : ['claude', 'gemini'];

  let lastError = null;

  for (const provider of order) {
    try {
      if (provider === 'claude') {
        const text = await callClaude({ apiKey: keys.claude, system, messages, maxTokens });
        return { text, providerUsed: 'claude' };
      } else {
        const text = await callGemini({ apiKey: keys.gemini, system, messages, maxTokens });
        return { text, providerUsed: 'gemini' };
      }
    } catch (err) {
      lastError = err;
      if (isRateLimitError(err)) {
        console.warn(`${provider} kena rate limit, coba provider lain...`);
        continue; // lanjut ke provider berikutnya
      }
      // error selain rate limit (misal key invalid) — tetap coba provider lain juga
      console.error(`${provider} error:`, err.message);
      continue;
    }
  }

  // semua provider gagal
  throw lastError || new Error('Semua AI provider gagal merespons.');
}