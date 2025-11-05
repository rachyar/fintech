// src/app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- Impor useRouter
import { supabase } from "@/lib/supabaseClient"; // <-- Impor Supabase client

export default function LoginPage() {
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  
  // State untuk menangani UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // 1. Coba login ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      setIsLoading(false);
      setErrorMessage("Email atau password salah."); // Pesan error umum
      return;
    }

    if (!authData.user) {
      setIsLoading(false);
      setErrorMessage("Gagal mendapatkan data pengguna. Silakan coba lagi.");
      return;
    }

    // 2. Jika login berhasil, cek tabel 'profiles'
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('status, role') // Ambil status dan role
      .eq('id', authData.user.id) // Cocokkan dengan ID pengguna
      .single(); // Ambil satu baris

    if (profileError || !profile) {
      setIsLoading(false);
      setErrorMessage("Gagal mengambil profil Anda. Hubungi support.");
      await supabase.auth.signOut(); // Tendang keluar jika profil tidak ada
      return;
    }

    // 3. Implementasi LOGIKA BISNIS kita
    if (profile.status === 0) {
      // INI ADALAH TES KITA
      setIsLoading(false);
      setErrorMessage("Akun Anda sedang menunggu persetujuan Admin.");
      await supabase.auth.signOut(); // Tendang keluar
      return;
    }

    // 4. JIKA STATUS = 1 (Aktif), arahkan berdasarkan role
    if (profile.role === 'admin') {
      router.push('/dashboard/admin'); // Arahkan Admin
    } else if (profile.role === 'publik') {
      router.push('/dashboard/user'); // Arahkan Pengguna Publik
    } else {
      // Fallback jika role tidak terdefinisi
      setIsLoading(false);
      setErrorMessage("Role Anda tidak terdefinisi.");
      await supabase.auth.signOut();
    }
    
    // Kita biarkan isLoading=true saat sukses, 
    // karena halaman akan berganti
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-xl">
      <h1 className="mb-2 text-center text-3xl font-bold text-white">
        Selamat Datang
      </h1>
      <p className="mb-6 text-center text-sm text-gray-400">
        Login untuk masuk ke dashboard Anda.
      </p>

      <form onSubmit={handleLogin}>
        {/* === Pesan Error === */}
        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-900 p-3 text-center text-sm text-white">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            placeholder="anda@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Memeriksa..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-cyan-400 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}