import { NextResponse } from 'next/server';
import { callAIWithFallback } from '@/lib/aiProvider';
import { buildInterviewSystemPrompt } from '@/data/prdSystemPrompt';

export async function POST(request) {
  try {
    const { schema, messages, provider } = await request.json();

    if (!schema) {
      return NextResponse.json({ error: 'schema wajib diisi' }, { status: 400 });
    }

    const system = buildInterviewSystemPrompt(schema);

    const { text, providerUsed } = await callAIWithFallback({
      system,
      messages,
      maxTokens: 1024,
      primary: provider || 'claude',
    });

    return NextResponse.json({ reply: text, providerUsed });
  } catch (err) {
    console.error('prd-chat error:', err);
    return NextResponse.json({ error: 'Gagal menghubungi AI. Coba lagi.' }, { status: 500 });
  }
}