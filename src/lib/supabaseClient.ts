// src/lib/supabaseClient.ts

import { createBrowserClient } from '@supabase/ssr'; // <-- Ganti import

// Ambil variabel environment yang kita buat di .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi bahwa variabelnya ada
if (!supabaseUrl) {
  throw new Error("Konfigurasi error: NEXT_PUBLIC_SUPABASE_URL tidak ditemukan.");
}
if (!supabaseAnonKey) {
  throw new Error("Konfigurasi error: NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan.");
}

// Buat satu instance (singleton) dari Supabase client
// TAPI kali ini gunakan 'createBrowserClient' dari '@supabase/ssr'
// Ini adalah pengganti 'createClient' dari '@supabase/supabase-js'
export const supabase = createBrowserClient(
  supabaseUrl!, // ! menandakan kita yakin ini tidak null
  supabaseAnonKey!
);