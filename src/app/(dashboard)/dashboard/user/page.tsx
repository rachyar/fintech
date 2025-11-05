// src/app/(dashboard)/dashboard/user/page.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import TransactionForm from '@/components/TransactionForm'; // <-- Impor formulir
import DeleteButton from '@/components/DeleteButton';
import EditTransactionModal from '@/components/EditTransactionModal';
import TransactionChart from '@/components/TransactionChart';

// Tipe data untuk transaksi
type Transaction = {
  id: number;
  created_at: string;
  description: string;
  amount: number;
  type: string;
  user_id: string;
};

export default async function UserDashboard() {
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
      // ... (Anda bisa tambahkan 'set' dan 'remove' di sini 
      // seperti di 'actions.ts' untuk kelengkapan)
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

  // 2. Ambil data transaksi
  // RLS (Step 13) akan mengurus filternya secara otomatis
  const { data: transactions, error: txError } = await supabase // <-- UBAH INI (rename 'error')
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  // 3. Ambil data kategori
  const { data: categories, error: catError } = await supabase // <-- TAMBAHKAN INI
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  // 4. Perbarui penanganan error
  if (txError || catError) { // <-- UBAH INI
    return <div className="p-8">Error: {txError?.message || catError?.message}</div>;
  }

  // Hitung Saldo (Sederhana)
  const balance = transactions.reduce((acc, t) => {
    return t.type === 'pemasukan' ? acc + t.amount : acc - t.amount;
  }, 0);

  // PROSES DATA UNTUK GRAFIK
    const totalPemasukan = transactions
    .filter(t => t.type === 'pemasukan')
    .reduce((acc, t) => acc + t.amount, 0);

    const totalPengeluaran = transactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((acc, t) => acc + t.amount, 0);

    const chartData = [
    { name: 'Pemasukan', total: totalPemasukan },
    { name: 'Pengeluaran', total: totalPengeluaran },
    ];

    

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cyan-400">
        Dashboard Anda
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Selamat datang, mari lacak keuangan Anda.
      </p>

      {/* Tampilan Saldo */}
      <div className="my-8">
        <h2 className="text-xl font-semibold text-white">Saldo Saat Ini:</h2>
        <p className={`text-5xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          Rp {new Intl.NumberFormat('id-ID').format(balance)}
        </p>
      </div>

      {/* Tampilan Grafik */}
        <div className="my-8">
            <h2 className="text-xl font-semibold text-white mb-4">Ringkasan</h2>
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md">
                <TransactionChart data={chartData} />
            </div>
        </div>

      {/* Grid Layout (Formulir di kiri, Daftar di kanan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Kolom 1: Formulir */}
        <div className="md:col-span-1">
          {/* 5. Berikan 'categories' ke formulir */}
          <TransactionForm categories={categories || []} /> {/* <-- UBAH INI */}
        </div>

        {/* Kolom 2: Daftar Transaksi */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Riwayat Transaksi</h2>
          <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-md">
            <ul className="divide-y divide-gray-700">

              {transactions.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-400">
                  Belum ada transaksi.
                </li>
              ) : (
                transactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between px-6 py-4">
                    {/* Info Kiri: Deskripsi & Tanggal */}
                    <div>
                    <p className="font-medium text-white">{t.description}</p>
                    <p className="text-sm text-gray-400">
                        {new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                    </p>
                    </div>

                    {/* Info Kanan: Harga & Tombol Hapus */}
                    <div className="flex items-center space-x-2">
                    <p className={`text-lg font-semibold ${
                        t.type === 'pemasukan' ? 'text-green-400' : 'text-red-400'
                    }`}>
                        {t.type === 'pemasukan' ? '+' : '-'} Rp {new Intl.NumberFormat('id-ID').format(t.amount)}
                    </p>

                    {/* TOMBOL EDIT BARU */}
                    <EditTransactionModal transaction={t} />

                    {/* TOMBOL HAPUS LAMA */}
                    <DeleteButton transactionId={t.id} />
                    </div>
                </li>
                ))
              )}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}