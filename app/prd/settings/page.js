'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({ claude: null, gemini: null });
  const [claudeKey, setClaudeKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/prd-settings')
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.settings?.forEach((s) => (map[s.id] = s));
        setSettings(map);
      });
  }, []);

  async function saveKey(provider, key) {
    if (!key.trim()) return;
    setSaving(provider);
    setMessage(null);
    try {
      const res = await fetch('/api/prd-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: key.trim() }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessage(`Key ${provider} berhasil disimpan.`);
      if (provider === 'claude') setClaudeKey('');
      if (provider === 'gemini') setGeminiKey('');
      const refreshed = await fetch('/api/prd-settings').then((r) => r.json());
      const map = {};
      refreshed.settings?.forEach((s) => (map[s.id] = s));
      setSettings(map);
    } catch (err) {
      setMessage(`Gagal simpan: ${err.message}`);
    } finally {
      setSaving(null);
    }
  }

  return (
    <main className="settings-wrap">
      <div className="settings-card">
        <h1>AI Provider Settings</h1>
        <p>Key disimpan di database, gak pernah ke-expose ke browser klien.</p>

        <div className="provider-block">
          <h2>Claude (Anthropic)</h2>
          <p className="status">
            Status: {settings.claude?.hasKey ? `Aktif (${settings.claude.maskedKey})` : 'Belum diset'}
          </p>
          <div className="input-row">
            <input
              type="password"
              placeholder="sk-ant-..."
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
            />
            <button onClick={() => saveKey('claude', claudeKey)} disabled={saving === 'claude'}>
              {saving === 'claude' ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>

        <div className="provider-block">
          <h2>Gemini (Google)</h2>
          <p className="status">
            Status: {settings.gemini?.hasKey ? `Aktif (${settings.gemini.maskedKey})` : 'Belum diset'}
          </p>
          <div className="input-row">
            <input
              type="password"
              placeholder="AIza..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />
            <button onClick={() => saveKey('gemini', geminiKey)} disabled={saving === 'gemini'}>
              {saving === 'gemini' ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}

        <p className="note">
          Sistem akan coba Claude dulu; kalau kena rate limit, otomatis pindah ke Gemini
          (dan sebaliknya kalau Gemini yang jadi default chat di masa depan).
        </p>
      </div>

      <style jsx>{`
        .settings-wrap {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .settings-card {
          width: 100%;
          max-width: 520px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
        }
        h1 {
          font-size: 22px;
          margin-bottom: 4px;
        }
        p {
          color: var(--muted);
          font-size: 13px;
        }
        .provider-block {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        h2 {
          font-size: 16px;
          margin-bottom: 6px;
        }
        .status {
          margin-bottom: 10px;
          font-size: 13px;
        }
        .input-row {
          display: flex;
          gap: 8px;
        }
        input {
          flex: 1;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--text);
          font-size: 14px;
        }
        input:focus {
          outline: none;
          border-color: var(--accent);
        }
        button {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .message {
          margin-top: 16px;
          color: var(--accent2);
        }
        .note {
          margin-top: 20px;
          font-size: 12px;
        }
      `}</style>
    </main>
  );
}