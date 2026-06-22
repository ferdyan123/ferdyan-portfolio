import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { cookies } from 'next/headers';

function checkAuth() {
  const session = cookies().get('prd_session');
  return session?.value === 'authenticated';
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin.from('ai_settings').select('id, api_key, updated_at');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // Mask key, jangan kirim full key balik ke client
  const masked = data.map((row) => ({
    id: row.id,
    hasKey: !!row.api_key,
    maskedKey: row.api_key ? `${row.api_key.slice(0, 6)}...${row.api_key.slice(-4)}` : null,
    updatedAt: row.updated_at,
  }));
  return NextResponse.json({ settings: masked });
}

export async function POST(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { provider, apiKey } = await request.json();
  if (!['claude', 'gemini'].includes(provider)) {
    return NextResponse.json({ error: 'Provider tidak valid' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('ai_settings')
    .upsert({ id: provider, api_key: apiKey, updated_at: new Date().toISOString() });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}