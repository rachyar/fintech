// src/app/(dashboard)/dashboard/profile/page.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import UpdateProfileForm from '@/components/UpdateProfileForm';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

export default async function ProfilePage() {
  // 1. Buat Supabase client (pola server-side)
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: async (name: string) => {
        const store = await cookieStore;
        return store.get(name)?.value;
      },
      set: async (name: string, value: string, options) => {
        const store = await cookieStore;
        store.set(name, value, options);
      },
      remove: async (name: string, options) => {
        const store = await cookieStore;
        store.set(name, '', options);
      },
    },
  });

  // 2. Ambil data pengguna DAN profil secara bersamaan
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name') // Kita hanya butuh nama lengkap
      .eq('id', user.id)
      .single();
    profile = profileData;
  }

  if (!user) {
    return <div className="p-8">Error: Pengguna tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cyan-400">
        Manajemen Profil
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Perbarui informasi akun dan password Anda.
      </p>

      {/* Grid Layout (2 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        {/* Kolom 1: Formulir Profil */}
        <UpdateProfileForm 
          email={user.email || 'Email tidak ditemukan'}
          fullName={profile?.full_name || null}
        />

        {/* Kolom 2: Formulir Password */}
        <UpdatePasswordForm />

      </div>
    </div>
  );
}