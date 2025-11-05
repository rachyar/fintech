// src/components/AddCategoryForm.tsx

"use client";

import { useRef, useState, useTransition } from "react";
import { addCategory } from "@/app/actions";

export default function AddCategoryForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);

    startTransition(async () => {
      const result = await addCategory(formData);
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
      <h2 className="text-xl font-semibold text-white mb-4">Tambah Kategori Baru</h2>

      {message && (
        <div 
          className={`mb-4 p-3 rounded-md text-sm ${
            message.startsWith("Gagal") ? 'bg-red-900 text-white' : 
            message.startsWith("Kategori berhasil") ? 'bg-green-900 text-white' : ''
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Nama Kategori
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          placeholder="Contoh: Makanan, Gaji"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Tipe</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="pengeluaran"
              className="text-cyan-500 focus:ring-cyan-600"
              required
              defaultChecked
            />
            <span className="text-gray-300">Pengeluaran</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="pemasukan"
              className="text-cyan-500 focus:ring-cyan-600"
              required
            />
            <span className="text-gray-300">Pemasukan</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isPending ? "Menyimpan..." : "Simpan Kategori"}
      </button>
    </form>
  );
}