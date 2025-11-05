// src/components/TransactionForm.tsx

"use client";

import { useRef, useState, useTransition, useMemo } from "react";
import { addTransaction } from "@/app/actions";

type Category = {
  id: number;
  name: string;
  type: string;
  user_id: string;
};

export default function TransactionForm({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedType, setSelectedType] = useState('pengeluaran');

  // ===============================================
  // PERUBAHAN DIMULAI DI SINI
  // ===============================================

  // State untuk nilai yang diformat (misal: "40.000")
  const [displayValue, setDisplayValue] = useState("");
  // State untuk nilai angka bersih (misal: "40000")
  const [numericValue, setNumericValue] = useState("");

  // Fungsi untuk memformat angka saat pengguna mengetik
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // 1. Hapus semua karakter non-angka (selain angka)
    const cleanValue = rawValue.replace(/[^0-9]/g, '');

    if (cleanValue === '') {
      setDisplayValue('');
      setNumericValue('');
      return;
    }

    // 2. Simpan nilai bersih untuk hidden input
    setNumericValue(cleanValue);

    // 3. Format angka untuk ditampilkan ke pengguna
    try {
      const formattedValue = new Intl.NumberFormat('id-ID').format(Number(cleanValue));
      setDisplayValue(formattedValue);
    } catch (error) {
      // Tangani jika angka terlalu besar
      setDisplayValue(cleanValue);
    }
  };
  // ===============================================
  // AKHIR PERUBAHAN Logika
  // ===============================================

  const availableCategories = useMemo(() => {
    return categories.filter(c => c.type === selectedType);
  }, [categories, selectedType]);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);

    startTransition(async () => {
      const result = await addTransaction(formData);

      if (result.success) {
        formRef.current?.reset();
        setSelectedType('pengeluaran');
        setMessage("Transaksi berhasil ditambahkan!");
        // Reset state formatting
        setDisplayValue(''); // <-- Reset
        setNumericValue(''); // <-- Reset
      } else {
        setMessage(result.message || "Gagal menambah transaksi.");
      }
    });
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md"
    >
      {/* ... (Judul, Pesan Status, Input Deskripsi tidak berubah) ... */}
      <h2 className="text-xl font-semibold text-white mb-4">Tambah Transaksi Baru</h2>

      {message && (
        <div 
          className={`mb-4 p-3 rounded-md text-sm ${
            message.startsWith("Gagal") ? 'bg-red-900 text-white' : 'bg-green-900 text-white'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Deskripsi
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          placeholder="Contoh: Beli Kopi"
          required
        />
      </div>

      {/* =============================================== */}
      {/* PERUBAHAN Input Jumlah (Amount) */}
      {/* =============================================== */}
      <div className="mb-4">
        <label htmlFor="amount-display" className="block text-sm font-medium text-gray-300 mb-1">
          Jumlah (Rp)
        </label>
        <input
          type="text" // <-- 1. Ubah ke 'text'
          id="amount-display" // <-- 2. Ubah ID agar tidak bentrok
          inputMode="numeric" // <-- 3. Keyboard mobile yang lebih baik
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
          placeholder="Contoh: 50.000" // <-- 4. Update placeholder
          required
          value={displayValue} // <-- 5. Gunakan state 'displayValue'
          onChange={handleAmountChange} // <-- 6. Gunakan handler baru
          // 'name' dihapus dari sini
        />
        {/* 7. Input tersembunyi untuk mengirim nilai bersih ke Server Action */}
        <input
          type="hidden"
          name="amount" // <-- Ini yang akan dibaca Server Action
          value={numericValue} // <-- Kirim nilai bersih (misal: 40000)
        />
      </div>
      {/* =============================================== */}
      {/* AKHIR PERUBAHAN Input Jumlah */}
      {/* =============================================== */}

      {/* ... (Input Tipe, Dropdown Kategori, Tombol Submit tidak berubah) ... */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Tipe</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="pengeluaran"
              className="text-cyan-500 focus:ring-cyan-600"
              required
              checked={selectedType === 'pengeluaran'}
              onChange={() => setSelectedType('pengeluaran')}
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
              checked={selectedType === 'pemasukan'}
              onChange={() => setSelectedType('pemasukan')}
            />
            <span className="text-gray-300">Pemasukan</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-300 mb-1">
          Kategori
        </label>
        <select
          id="category_id"
          name="category_id"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          disabled={availableCategories.length === 0}
        >
          <option value="">-- Pilih Kategori --</option>
          {availableCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {availableCategories.length === 0 && (
          <p className="mt-1 text-xs text-gray-400">
            (Tidak ada kategori. Silakan tambahkan di halaman 'Kategori'.)
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isPending ? "Menyimpan..." : "Simpan Transaksi"}
      </button>
    </form>
  );
}