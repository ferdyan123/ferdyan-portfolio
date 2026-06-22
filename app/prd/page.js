'use client';

import { useState, useRef, useEffect } from 'react';
import { schemaOptions } from '@/data/discoveryQuestions';

const STAGE = {
  SCHEMA: 'schema',
  CONTACT: 'contact',
  CHAT: 'chat',
  CONFIRM: 'confirm',
  RESULT: 'result',
};

export default function PrdPage() {
  const [stage, setStage] = useState(STAGE.SCHEMA);
  const [schema, setSchema] = useState(null);
  const [provider, setProvider] = useState('claude');
  const [contact, setContact] = useState({ name: '', email: '', whatsapp: '' });
  const [messages, setMessages] = useState([]); // { role, content }
  const [pendingSummary, setPendingSummary] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [prdResult, setPrdResult] = useState(null);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function selectSchema(val) {
    setSchema(val);
    setStage(STAGE.CONTACT);
  }

  async function startChat() {
    setStage(STAGE.CHAT);
    setLoading(true);
    await sendToAI([]);
  }

  function extractSummary(text) {
    const match = text.match(/<SUMMARY>([\s\S]*?)<\/SUMMARY>/);
    if (!match) return { displayText: text, summary: null };
    const displayText = text.replace(/<SUMMARY>[\s\S]*?<\/SUMMARY>/, '').trim();
    try {
      const summary = JSON.parse(match[1].trim());
      return { displayText, summary };
    } catch {
      return { displayText, summary: null };
    }
  }

  async function sendToAI(updatedMessages) {
    setError(null);
    try {
      const res = await fetch('/api/prd-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema, messages: updatedMessages, provider }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const { displayText, summary } = extractSummary(data.reply);
      setMessages([...updatedMessages, { role: 'assistant', content: displayText }]);

      if (summary) {
        setPendingSummary(summary);
        setStage(STAGE.CONFIRM);
      }
    } catch (err) {
      console.error(err);
      setError('Gagal menghubungi AI. Coba kirim lagi.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || loading) return;
    const updated = [...messages, { role: 'user', content: input }];
    setMessages(updated);
    setInput('');
    setLoading(true);
    await sendToAI(updated);
  }

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/prd-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema, contact, answers: pendingSummary }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPrdResult(data);
      setStage(STAGE.RESULT);
    } catch (err) {
      console.error(err);
      setError('Gagal generate PRD. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  function handleEditMore() {
    setStage(STAGE.CHAT);
    setPendingSummary(null);
    setMessages([
      ...messages,
      { role: 'assistant', content: 'Oke, ada yang mau ditambahin/diralat? Bilang aja.' },
    ]);
  }

  return (
    <main className="prd-wrap">
      {stage === STAGE.SCHEMA && <SchemaStep onSelect={selectSchema} />}

      {stage === STAGE.CONTACT && (
        <ContactStep
          contact={contact}
          setContact={setContact}
          provider={provider}
          setProvider={setProvider}
          onNext={startChat}
        />
      )}

      {(stage === STAGE.CHAT || stage === STAGE.CONFIRM) && (
        <div className="chat-card">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="bubble assistant typing">Mengetik...</div>}
            <div ref={chatEndRef} />
          </div>

          {stage === STAGE.CHAT && (
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Tulis jawaban kamu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button className="chat-send" onClick={handleSend} disabled={loading || !input.trim()}>
                Kirim
              </button>
            </div>
          )}

          {stage === STAGE.CONFIRM && pendingSummary && (
            <div className="confirm-box">
              <h3>Ringkasan kebutuhan kamu:</h3>
              <pre className="summary-pre">{JSON.stringify(pendingSummary, null, 2)}</pre>
              <div className="confirm-actions">
                <button className="btn-secondary" onClick={handleEditMore}>
                  Masih ada yang mau ditambah
                </button>
                <button className="btn-primary" onClick={handleConfirm} disabled={loading}>
                  {loading ? 'Membuat PRD...' : 'Konfirmasi & Generate PRD'}
                </button>
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}
        </div>
      )}

      {stage === STAGE.RESULT && prdResult && (
        <div className="result-card">
          <h2>PRD kamu udah jadi 🎉</h2>
          <pre className="prd-output">{prdResult.prd}</pre>
          <button
            className="btn-primary"
            onClick={() => navigator.clipboard.writeText(prdResult.prd)}
          >
            Copy PRD
          </button>
        </div>
      )}

      <style jsx>{`
        .prd-wrap {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .chat-card,
        .result-card {
          width: 100%;
          max-width: 640px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          max-height: 85vh;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
          padding-right: 4px;
        }
        .bubble {
          padding: 10px 14px;
          border-radius: 10px;
          max-width: 80%;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .bubble.assistant {
          background: var(--bg3);
          align-self: flex-start;
        }
        .bubble.user {
          background: var(--accent);
          color: #fff;
          align-self: flex-end;
        }
        .bubble.typing {
          opacity: 0.5;
        }
        .chat-input-row {
          display: flex;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          color: var(--text);
          font-size: 14px;
        }
        .chat-input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .chat-send {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-weight: 600;
          cursor: pointer;
        }
        .confirm-box h3 {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .summary-pre {
          background: var(--bg3);
          border-radius: 8px;
          padding: 12px;
          font-size: 12px;
          max-height: 240px;
          overflow-y: auto;
          white-space: pre-wrap;
        }
        .confirm-actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-secondary {
          background: var(--bg3);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 20px;
          cursor: pointer;
        }
        .error-text {
          color: #f87171;
          font-size: 13px;
          margin-top: 10px;
        }
        .prd-output {
          background: var(--bg3);
          border-radius: 8px;
          padding: 16px;
          font-size: 13px;
          max-height: 60vh;
          overflow-y: auto;
          white-space: pre-wrap;
          margin-bottom: 16px;
        }
      `}</style>
    </main>
  );
}

function SchemaStep({ onSelect }) {
  return (
    <div className="schema-card">
      <h1>Website yang ingin kamu buat skemanya apa?</h1>
      <p>Pilih salah satu, AI akan menyesuaikan obrolan selanjutnya.</p>
      <div className="schema-grid">
        {schemaOptions.map((opt) => (
          <button key={opt.value} className="schema-option" onClick={() => onSelect(opt.value)}>
            <span className="label">{opt.label}</span>
            <span className="desc">{opt.desc}</span>
          </button>
        ))}
      </div>
      <style jsx>{`
        .schema-card {
          width: 100%;
          max-width: 560px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px;
          color: var(--text);
        }
        h1 {
          font-size: 22px;
          margin-bottom: 8px;
        }
        p {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 24px;
        }
        .schema-grid {
          display: grid;
          gap: 12px;
        }
        .schema-option {
          text-align: left;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .schema-option:hover {
          border-color: var(--accent);
        }
        .label {
          font-weight: 600;
        }
        .desc {
          font-size: 13px;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

function ContactStep({ contact, setContact, provider, setProvider, onNext }) {
  const valid = contact.name.trim() && contact.email.trim() && contact.whatsapp.trim();
  return (
    <div className="contact-card">
      <h1>Sebelum ngobrol, kenalan dulu yuk</h1>
      <input
        className="input"
        placeholder="Nama lengkap"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
      />
      <input
        className="input"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
      />
      <input
        className="input"
        placeholder="Nomor WhatsApp"
        value={contact.whatsapp}
        onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
      />
      <div className="provider-row">
        <label>
          <input
            type="radio"
            checked={provider === 'claude'}
            onChange={() => setProvider('claude')}
          />
          Claude
        </label>
        <label>
          <input
            type="radio"
            checked={provider === 'gemini'}
            onChange={() => setProvider('gemini')}
          />
          Gemini
        </label>
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!valid}>
        Mulai Ngobrol dengan AI
      </button>
      <style jsx>{`
        .contact-card {
          width: 100%;
          max-width: 480px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: var(--text);
        }
        h1 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .input {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          color: var(--text);
          font-size: 14px;
        }
        .provider-row {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--muted);
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }
        .btn-primary:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}