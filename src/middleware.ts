// src/middleware.ts

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Ini adalah fungsi middleware utama
export async function middleware(request: NextRequest) {
  // Buat client Supabase khusus untuk middleware
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options) {
        request.cookies.set({ name, value, ...options });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options) {
        request.cookies.set({ name, value: '', ...options });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  // 1. Ambil session pengguna saat ini
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 2. Ambil URL tujuan
  const nextUrl = request.nextUrl;

  // 3. LOGIKA UTAMA

  // Jika pengguna TIDAK login DAN mencoba mengakses rute '/dashboard'
  if (!session && nextUrl.pathname.startsWith('/dashboard')) {
    // Arahkan kembali (redirect) ke halaman login
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', nextUrl.pathname); // (Opsional)
    return NextResponse.redirect(redirectUrl);
  }

  // Jika pengguna SUDAH login DAN mencoba mengakses '/login' atau '/register'
  if (session && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
    // Arahkan kembali ke dashboard utama mereka
    // Kita akan sempurnakan ini nanti untuk admin/user, 
    // untuk sekarang kita arahkan saja ke /dashboard/user
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard/user'; 
    return NextResponse.redirect(redirectUrl);
  }

  // Jika semua kondisi aman, lanjutkan ke halaman yang diminta
  return response;
}

// 4. Konfigurasi Matcher
// Ini memberitahu middleware agar HANYA berjalan pada rute tertentu
// untuk menghemat performa.
export const config = {
  matcher: [
    /*
     * Cocokkan semua rute KECUALI:
     * - _next/static (file statis)
     * - _next/image (file gambar)
     * - favicon.ico (file favicon)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};