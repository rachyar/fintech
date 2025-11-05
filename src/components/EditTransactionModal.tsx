// src/components/EditTransactionModal.tsx

"use client";

import { useState, useTransition, useRef } from 'react';
import { updateTransaction } from '@/app/actions';

// Tipe data ini harus cocok dengan tipe 'Transaction' di halaman Anda
type Transaction = {
  id: number;
  created_at: string;
  description: string;
  amount: number;
  type: string;
  user_id: string;
};

// Icon (Pencil untuk Edit, X untuk Close)
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);

export default function EditTransactionModal({ transaction }: { transaction: Transaction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  // Gunakan ref untuk 'dialog'
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Buka modal
  const openModal = () => {
    setIsOpen(true);
    dialogRef.current?.showModal(); // Tampilkan modal
  };

  // Tutup modal
  const closeModal = () => {
    setIsOpen(false);
    dialogRef.current?.close(); // Tutup modal
  };

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);

    startTransition(async () => {
      // Panggil action dengan ID dan data formulir
      const result = await updateTransaction(transaction.id, formData);

      if (result.success) {
        setMessage("Update berhasil!");
        // Tutup modal setelah 1 detik
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        setMessage(result.message || "Gagal meng-update.");
      }
    });
  };

  return (
    <>
      {/* 1. Tombol "Edit" yang terlihat di daftar */}
      <button
        onClick={openModal}
        className="p-2 text-gray-400 rounded-md transition hover:bg-gray-700 hover:text-cyan-400"
        title="Edit transaksi"
      >
        <EditIcon />
      </button>

      {/* 2. Modal (dialog) yang tersembunyi */}
      <dialog
        ref={dialogRef}
        className="bg-gray-800 text-white rounded-lg shadow-xl p-0 w-full max-w-md backdrop:bg-black/60"
        // Tutup jika backdrop diklik
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
      >
        <div className="relative p-6">
          {/* Tombol Close di dalam Modal */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <CloseIcon />
          </button>

          <h3 className="text-xl font-semibold mb-4">Edit Transaksi</h3>

          {/* Formulir Edit */}
          <form action={handleSubmit}>
            {message && (
              <div className={`mb-4 p-3 rounded-md text-sm ${
                message.startsWith("Gagal") ? 'bg-red-900' : 'bg-green-900'
              }`}>
                {message}
              </div>
            )}

            {/* Input Deskripsi (sudah terisi) */}
            <div className="mb-4">
              <label htmlFor={`description-${transaction.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Deskripsi
              </label>
              <input
                type="text"
                id={`description-${transaction.id}`}
                name="description"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
                defaultValue={transaction.description} // <-- Nilai default
                required
              />
            </div>

            {/* Input Jumlah (sudah terisi) */}
            <div className="mb-4">
              <label htmlFor={`amount-${transaction.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                Jumlah (Rp)
              </label>
              <input
                type="number"
                id={`amount-${transaction.id}`}
                name="amount"
                step="1000"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
                defaultValue={transaction.amount} // <-- Nilai default
                required
              />
            </div>

            {/* Input Tipe (sudah terisi) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipe</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="pengeluaran"
                    className="text-cyan-500 focus:ring-cyan-600"
                    defaultChecked={transaction.type === 'pengeluaran'} // <-- Cek default
                    required
                  />
                  <span className="text-gray-300">Pengeluaran</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="pemasukan"
                    className="text-cyan-500 focus:ring-cyan-600"
                    defaultChecked={transaction.type === 'pemasukan'} // <-- Cek default
                    required
                  />
                  <span className="text-gray-300">Pemasukan</span>
                </label>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}