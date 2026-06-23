'use client';

import { useState } from 'react';
import {
  schemaOptions,
  generalQuestions,
  schemaQuestions,
} from '@/data/discoveryQuestions';

export default function PrdPage() {
  const [step, setStep] = useState(0);
  const [schema, setSchema] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', whatsapp: '' });
  const [generalAnswers, setGeneralAnswers] = useState({});
  const [schemaAnswers, setSchemaAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [prdResult, setPrdResult] = useState(null);

  const activeSchemaQuestions = schema ? schemaQuestions[schema] : [];
  const totalSteps = 2 + generalQuestions.length + activeSchemaQuestions.length;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  function goNext() {
    setError(null);
    setStep((s) => s + 1);
  }
  function goBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }
  function updateGeneral(field, value) {
    setGeneralAnswers((prev) => ({ ...prev, [field]: value }));
  }
  function updateSchemaAnswer(field, value) {
    setSchemaAnswers((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/prd-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schema,
          contact,
          answers: { ...generalAnswers, ...schemaAnswers },
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPrdResult(data);
    } catch (err) {
      console.error(err);
      setError('Gagal generate PRD. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  if (prdResult) {
    return (
      <main className="prd-wrap">
        <div className="result-card">
          <h2>PRD kamu udah jadi 🎉</h2>
          <pre className="prd-output">{prdResult.prd}</pre>
          <button className="btn-primary" onClick={() => navigator.clipboard.writeText(prdResult.prd)}>
            Copy PRD
          </button>
        </div>
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
          .result-card {
            width: 100%;
            max-width: 640px;
            background: var(--bg2);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
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
          .btn-primary {
            background: var(--accent);
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-weight: 600;
            cursor: pointer;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="prd-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="card">
        {step === 0 && (
          <SchemaStep
            value={schema}
            onSelect={(val) => {
              setSchema(val);
              goNext();
            }}
          />
        )}

        {step === 1 && (
          <ContactStep contact={contact} setContact={setContact} onNext={goNext} onBack={goBack} />
        )}

        {step >= 2 && step < 2 + generalQuestions.length && (
          <QuestionStep
            question={generalQuestions[step - 2]}
            value={generalAnswers[generalQuestions[step - 2].field]}
            onChange={(val) => updateGeneral(generalQuestions[step - 2].field, val)}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step >= 2 + generalQuestions.length && (
          <QuestionStep
            question={activeSchemaQuestions[step - 2 - generalQuestions.length]}
            value={schemaAnswers[activeSchemaQuestions[step - 2 - generalQuestions.length]?.field]}
            onChange={(val) =>
              updateSchemaAnswer(activeSchemaQuestions[step - 2 - generalQuestions.length].field, val)
            }
            onNext={step === totalSteps - 1 ? handleSubmit : goNext}
            onBack={goBack}
            isLast={step === totalSteps - 1}
            submitting={submitting}
          />
        )}

        {error && <p className="error-text">{error}</p>}
      </div>

      <style jsx>{`
        .prd-wrap {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .progress-track {
          width: 100%;
          max-width: 560px;
          height: 4px;
          background: var(--border);
          border-radius: 4px;
          margin-bottom: 32px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        .card {
          width: 100%;
          max-width: 560px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px;
        }
        .error-text {
          color: #f87171;
          margin-top: 16px;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .card {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}

function SchemaStep({ value, onSelect }) {
  return (
    <div>
      <h1 className="step-title">Website yang ingin kamu buat skemanya apa?</h1>
      <p className="step-subtitle">Pilih salah satu, pertanyaan selanjutnya akan menyesuaikan.</p>
      <div className="schema-grid">
        {schemaOptions.map((opt) => (
          <button
            key={opt.value}
            className={`schema-option ${value === opt.value ? 'active' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="schema-label">{opt.label}</span>
            <span className="schema-desc">{opt.desc}</span>
          </button>
        ))}
      </div>
      <style jsx>{`
        .step-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
        .step-subtitle { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
        .schema-grid { display: grid; gap: 12px; }
        .schema-option {
          text-align: left; background: var(--bg3); border: 1px solid var(--border);
          border-radius: 10px; padding: 16px; cursor: pointer;
          display: flex; flex-direction: column; gap: 4px;
        }
        .schema-option:hover, .schema-option.active { border-color: var(--accent); }
        .schema-label { font-weight: 600; color: var(--text); }
        .schema-desc { font-size: 13px; color: var(--muted); }
      `}</style>
    </div>
  );
}

function ContactStep({ contact, setContact, onNext }) {
  const valid = contact.name.trim() && contact.email.trim() && contact.whatsapp.trim();
  return (
    <div>
      <h1 className="step-title">Sebelum lanjut, kenalan dulu yuk</h1>
      <p className="step-subtitle">Biar gw bisa kirim PRD dan hubungi kamu balik.</p>
      <div className="field-group">
        <input className="input" placeholder="Nama lengkap" value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })} />
        <input className="input" placeholder="Email" value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })} />
        <input className="input" placeholder="Nomor WhatsApp" value={contact.whatsapp}
          onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
      </div>
      <StepNav onNext={onNext} nextDisabled={!valid} hideBack />
      <style jsx>{`
        .step-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
        .step-subtitle { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
        .field-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .input {
          background: var(--bg3); border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 14px; color: var(--text); font-size: 14px;
        }
        .input:focus { outline: none; border-color: var(--accent); }
      `}</style>
    </div>
  );
}

function QuestionStep({ question, value, onChange, onNext, onBack, isLast, submitting }) {
  const filled =
    question.optional ||
    (Array.isArray(value) ? value.length > 0 : value !== undefined && value !== '' && value !== null);

  return (
    <div>
      <h1 className="step-title">{question.label}</h1>
      <div className="field-group">
        {question.type === 'text' && (
          <input className="input" value={value || ''} onChange={(e) => onChange(e.target.value)} autoFocus />
        )}
        {question.type === 'number' && (
          <input className="input" type="number" value={value ?? ''} onChange={(e) => onChange(Number(e.target.value))} autoFocus />
        )}
        {question.type === 'textarea' && (
          <textarea className="input" rows={4} value={value || ''} onChange={(e) => onChange(e.target.value)} autoFocus />
        )}
        {question.type === 'boolean' && (
          <div className="choice-group">
            <button className={`choice-btn ${value === true ? 'active' : ''}`} onClick={() => onChange(true)}>Ya</button>
            <button className={`choice-btn ${value === false ? 'active' : ''}`} onClick={() => onChange(false)}>Tidak</button>
          </div>
        )}
        {question.type === 'select' && (
          <div className="choice-group wrap">
            {question.options.map((opt) => (
              <button key={opt} className={`choice-btn ${value === opt ? 'active' : ''}`} onClick={() => onChange(opt)}>
                {opt}
              </button>
            ))}
          </div>
        )}
        {question.type === 'multiselect' && (
          <div className="choice-group wrap">
            {question.options.map((opt) => {
              const selected = Array.isArray(value) && value.includes(opt);
              return (
                <button
                  key={opt}
                  className={`choice-btn ${selected ? 'active' : ''}`}
                  onClick={() => {
                    const current = Array.isArray(value) ? value : [];
                    onChange(selected ? current.filter((v) => v !== opt) : [...current, opt]);
                  }}
                >
                  {selected ? '✓ ' : ''}{opt}
                </button>
              );
            })}
          </div>
        )}
        {question.type === 'tags' && (
          <TagsInput value={value || []} onChange={onChange} placeholder={question.placeholder} />
        )}
        {question.optional && <p className="optional-hint">Opsional — boleh dilewati</p>}
      </div>
      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!filled}
        nextLabel={isLast ? (submitting ? 'Membuat PRD...' : 'Generate PRD') : 'Lanjut'}
        nextLoading={submitting}
      />
      <style jsx>{`
        .step-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; line-height: 1.4; color: var(--text); }
        .field-group { margin-bottom: 24px; }
        .input {
          width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 14px; color: var(--text); font-size: 14px; font-family: inherit;
        }
        .input:focus { outline: none; border-color: var(--accent); }
        .choice-group { display: flex; gap: 10px; }
        .choice-group.wrap { flex-wrap: wrap; }
        .choice-btn {
          padding: 10px 16px; background: var(--bg3); border: 1px solid var(--border);
          border-radius: 20px; color: var(--text); cursor: pointer; font-size: 13px;
        }
        .choice-btn.active { border-color: var(--accent); background: rgba(127,119,221,0.18); }
        .optional-hint { font-size: 12px; color: var(--muted); margin-top: 6px; }
      `}</style>
    </div>
  );
}

function TagsInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState('');
  function addTag() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft('');
  }
  function removeTag(idx) {
    onChange(value.filter((_, i) => i !== idx));
  }
  return (
    <div>
      <input
        className="input"
        placeholder={placeholder}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
        autoFocus
      />
      <div className="tags-list">
        {value.map((tag, idx) => (
          <span key={idx} className="tag-chip">
            {tag}
            <button onClick={() => removeTag(idx)}>&times;</button>
          </span>
        ))}
      </div>
      <style jsx>{`
        .input {
          width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 14px; color: var(--text); font-size: 14px;
        }
        .input:focus { outline: none; border-color: var(--accent); }
        .tags-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .tag-chip {
          background: rgba(127,119,221,0.15); color: var(--accent2); border-radius: 6px;
          padding: 4px 10px; font-size: 13px; display: flex; align-items: center; gap: 6px;
        }
        .tag-chip button { background: none; border: none; color: var(--accent2); cursor: pointer; font-size: 14px; }
      `}</style>
    </div>
  );
}

function StepNav({ onBack, onNext, nextDisabled, nextLabel = 'Lanjut', nextLoading, hideBack }) {
  return (
    <div className="step-nav">
      {!hideBack ? <button className="nav-back" onClick={onBack}>Kembali</button> : <span />}
      <button className="nav-next" onClick={onNext} disabled={nextDisabled || nextLoading}>
        {nextLabel}
      </button>
      <style jsx>{`
        .step-nav { display: flex; justify-content: space-between; align-items: center; }
        .nav-back { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 14px; }
        .nav-next {
          background: var(--accent); color: #fff; border: none; border-radius: 8px;
          padding: 12px 24px; font-weight: 600; cursor: pointer;
        }
        .nav-next:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
}