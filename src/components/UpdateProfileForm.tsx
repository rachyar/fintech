// src/components/UpdateProfileForm.tsx

"use client";

import { useState, useTransition } from 'react';
import { updateUserProfile } from '@/app/actions';

// Terima props email (read-only) dan nama
export default function UpdateProfileForm({
  email,
  fullName
}: {
  email: string;
  fullName: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateUserProfile(formData);
      setMessage(result.message || null);
    });
  };

  return (
    <form
      action={handleSubmit}
      className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Profil Publik</h2>

      {message && (
        <div 
          className={`mb-4 p-3 rounded-md text-sm ${
            message.startsWith("Gagal") ? 'bg-red-900 text-white' : 'bg-green-900 text-white'
          }`}
        >
          {message}
        </div>
      )}

      {/* Email (Read-only) */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-400"
          defaultValue={email}
          readOnly
          disabled
        />
      </div>

      {/* Nama Lengkap (Bisa diedit) */}
      <div className="mb-6">
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          defaultValue={fullName || ''}
          placeholder="Nama Anda"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isPending ? "Menyimpan..." : "Update Profil"}
      </button>
    </form>
  );
}