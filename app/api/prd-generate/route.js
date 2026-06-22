import { NextResponse } from 'next/server';
import { callAIWithFallback } from '@/lib/aiProvider';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { generalQuestions, schemaQuestions, schemaTableMap, schemaOptions } from '@/data/discoveryQuestions';
import { randomUUID } from 'crypto';

function buildPrdPrompt(schema, answers) {
  const schemaLabel = schemaOptions.find((s) => s.value === schema)?.label || schema;
  const allQuestions = [...generalQuestions, ...(schemaQuestions[schema] || [])];

  const answeredPairs = allQuestions
    .map((q) => `${q.label}\n→ ${JSON.stringify(answers[q.field] ?? 'Tidak diisi')}`)
    .join('\n\n');

  return `Buatkan Product Requirements Document (PRD) profesional dalam format Markdown untuk project website tipe "${schemaLabel}", berdasarkan data berikut:

${answeredPairs}

PRD harus mencakup section: Ringkasan Eksekutif, Tujuan Project, Target Pengguna, Daftar Fitur (prioritaskan must-have vs nice-to-have), Struktur Halaman/Sitemap, Rekomendasi Stack Teknis, Integrasi Pihak Ketiga (jika ada), dan Catatan Tambahan. Tulis dalam bahasa Indonesia profesional namun mudah dipahami klien non-teknis.`;
}

export async function POST(request) {
  try {
    const { schema, contact, answers } = await request.json();

    if (!schema || !contact || !answers) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // 1. Generate PRD pakai Claude
    const prdPrompt = buildPrdPrompt(schema, answers);
    const { text: prdMarkdown } = await callAIWithFallback({
      system: 'Kamu adalah konsultan produk digital yang ahli menulis PRD (Product Requirements Document) yang jelas dan actionable.',
      messages: [{ role: 'user', content: prdPrompt }],
      maxTokens: 4096,
      primary: 'claude',
    });

    // 2. Simpan ke Supabase (pakai admin client, bypass RLS karena ini server-side trusted)
    const { data: client, error: clientErr } = await supabaseAdmin
      .from('clients')
      .insert({
        name: contact.name,
        email: contact.email,
        whatsapp: contact.whatsapp,
        source: 'form_cta',
      })
      .select()
      .single();
    if (clientErr) throw clientErr;

    const { data: submission, error: subErr } = await supabaseAdmin
      .from('submissions')
      .insert({
        client_id: client.id,
        schema_type: schema,
        status: 'prd_generated',
        submitted_at: new Date().toISOString(),
        prd_generated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (subErr) throw subErr;

    const generalFields = generalQuestions.reduce((acc, q) => {
      acc[q.field] = answers[q.field] ?? null;
      return acc;
    }, {});
    const { error: genErr } = await supabaseAdmin
      .from('answers_general')
      .insert({ submission_id: submission.id, ...generalFields });
    if (genErr) throw genErr;

    const schemaFields = (schemaQuestions[schema] || []).reduce((acc, q) => {
      acc[q.field] = answers[q.field] ?? null;
      return acc;
    }, {});
    const tableName = schemaTableMap[schema];
    const { error: schemaErr } = await supabaseAdmin
      .from(tableName)
      .insert({ submission_id: submission.id, ...schemaFields });
    if (schemaErr) throw schemaErr;

    const shareToken = randomUUID();
    const { error: prdErr } = await supabaseAdmin
      .from('prd_outputs')
      .insert({
        submission_id: submission.id,
        prd_markdown: prdMarkdown,
        share_token: shareToken,
      });
    if (prdErr) throw prdErr;

    return NextResponse.json({ prd: prdMarkdown, shareToken });
  } catch (err) {
    console.error('prd-generate error:', err);
    return NextResponse.json({ error: 'Gagal generate PRD. Coba lagi.' }, { status: 500 });
  }
}