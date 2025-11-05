// src/components/UpdatePasswordForm.tsx

"use client";

import { useRef, useState, useTransition } from 'react';
import { updateUserPassword } from '@/app/actions';

export default function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateUserPassword(formData);
      setMessage(result.message || null);

      if (result.success) {
        formRef.current?.reset();
      }
    });
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Ubah Password</h2>

      {message && (
        <div 
          className={`mb-4 p-3 rounded-md text-sm ${
            message.startsWith("Gagal") ? 'bg-red-900 text-white' : 'bg-green-900 text-white'
          }`}
        >
          {message}
        </div>
      )}

      {/* Password Baru */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password Baru
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          placeholder="Minimal 6 karakter"
          minLength={6}
          required
        />
      </div>

      {/* Konfirmasi Password */}
      <div className="mb-6">
        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300 mb-1">
          Konfirmasi Password Baru
        </label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          placeholder="Ketik ulang password baru Anda"
          minLength={6}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isPending ? "Menyimpan..." : "Update Password"}
      </button>
    </form>
  );
}