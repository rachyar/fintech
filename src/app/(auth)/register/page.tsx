// src/app/(auth)/register/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);

    } else if (data.user) {

      // ===============================================
      // PERBAIKAN ADA DI SINI
      // ===============================================
      // Hancurkan sesi yang baru dibuat oleh signUp()
      // Ini memaksa pengguna untuk login manual
      await supabase.auth.signOut();
      // ===============================================

      setIsLoading(false); // Pindahkan ini ke setelah signOut

      setSuccessMessage(
        "Registrasi berhasil! Akun Anda perlu persetujuan Admin sebelum bisa login."
      );

      setTimeout(() => {
        router.push("/login");
      }, 4000); // 4 detik
    } else {
      // Fallback jika data.user null tapi tidak ada error
      setIsLoading(false);
      setErrorMessage("Gagal mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-xl">
      <h1 className="mb-2 text-center text-3xl font-bold text-white">
        Buat Akun
      </h1>
      <p className="mb-6 text-center text-sm text-gray-400">
        Daftar untuk melacak keuangan Anda.
      </p>

      <form onSubmit={handleRegister}>
        {/* ... (Pesan Error & Sukses tetap sama) ... */}
        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-900 p-3 text-center text-sm text-white">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-md bg-green-900 p-3 text-center text-sm text-white">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
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
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
            placeholder="••••••••"
            minLength={6}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-cyan-400 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}