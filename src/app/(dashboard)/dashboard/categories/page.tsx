// src/app/(dashboard)/dashboard/categories/page.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import AddCategoryForm from '@/components/AddCategoryForm';
import { deleteCategory } from '@/app/actions';

type Category = {
  id: number;
  name: string;
  type: string;
  user_id: string;
};

async function DeleteCategoryButton({ id }: { id: number }) {
  return (
    <form action={async () => {
      "use server";
      await deleteCategory(id);
    }}>
      <button 
        type="submit" 
        className="p-1 text-gray-500 hover:text-red-400"
        title="Hapus Kategori"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </form>
  );
}

export default async function CategoriesPage() {
  // 1. KODE KLIEN SUPABASE YANG LENGKAP (INI PERBAIKANNYA)
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
  // AKHIR PERBAIKAN

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return <div className="p-8">Error: {error.message}</div>;
  }

  const pengeluaran = categories.filter(c => c.type === 'pengeluaran');
  const pemasukan = categories.filter(c => c.type === 'pemasukan');

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cyan-400">
        Manajemen Kategori
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Tambah atau hapus kategori untuk transaksi Anda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="md:col-span-1">
          <AddCategoryForm />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Pengeluaran</h2>
            <ul className="space-y-2">
              {pengeluaran.length === 0 ? (
                <li className="text-gray-400 italic">Belum ada kategori.</li>
              ) : (
                pengeluaran.map(c => (
                  <li key={c.id} className="flex justify-between items-center rounded-md bg-gray-700 px-4 py-2">
                    <span className="text-white">{c.name}</span>
                    <DeleteCategoryButton id={c.id} />
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Pemasukan</h2>
            <ul className="space-y-2">
              {pemasukan.length === 0 ? (
                <li className="text-gray-400 italic">Belum ada kategori.</li>
              ) : (
                pemasukan.map(c => (
                  <li key={c.id} className="flex justify-between items-center rounded-md bg-gray-700 px-4 py-2">
                    <span className="text-white">{c.name}</span>
                    <DeleteCategoryButton id={c.id} />
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