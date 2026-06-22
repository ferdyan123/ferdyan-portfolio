// lib/supabaseServer.js
// Client Supabase khusus server-side (API routes), pakai secret key.
// JANGAN import ini di file 'use client' atau di kode yang jalan di browser.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  console.warn(
    'Supabase server env vars belum diset. Tambahkan SUPABASE_SECRET_KEY di .env.local'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, secretKey);