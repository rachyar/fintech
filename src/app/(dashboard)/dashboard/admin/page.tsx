// src/app/(dashboard)/dashboard/admin/page.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Impor 'cookies'
import ApproveButton from '@/components/ApproveButton';

// Definisikan tipe data
type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
  status: number | null;
  email: string | null;
};

export default async function AdminDashboard() {
  
  // =================================================================
  // INI ADALAH PERBAIKANNYA
  // =================================================================
  
  // 1. Panggil cookies() untuk mendapatkan PROMISE-nya
  // Kita tidak 'await' di sini
  const cookieStore = cookies(); 

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // 2. Definisikan 'get' sebagai fungsi ASYNC
      get: async (name: string) => {
        // 3. 'await' promise-nya DI DALAM 'get'
        // Ini adalah pola yang benar untuk menangani promise 'cookies()'
        const store = await cookieStore;
        return store.get(name)?.value;
      },
    },
  });
  
  // =================================================================
  // AKHIR DARI PERBAIKAN
  // =================================================================

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    return <div className="p-8">Error fetching profiles: {error.message}</div>;
  }

  const pendingUsers = profiles.filter(p => p.status === 0);
  const activeUsers = profiles.filter(p => p.status === 1);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-yellow-400">
        Admin Dashboard
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Manajemen pengguna dan persetujuan.
      </p>

      {/* Bagian 1: Menunggu Persetujuan */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white">
          Menunggu Persetujuan ({pendingUsers.length})
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 shadow-md">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">Email (ID)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {pendingUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-400">Tidak ada pengguna menunggu persetujuan.</td>
                </tr>
              ) : (
                pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-sm text-white" title={user.id}>{user.id.substring(0, 12)}...</td>
                    <td className="px-6 py-4 text-sm text-white">
                        {user.email} {/* <-- UBAH INI */}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.role}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded-full bg-yellow-900 px-2 py-1 text-xs font-medium text-yellow-300">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <ApproveButton userId={user.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bagian 2: Pengguna Aktif */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white">
          Pengguna Aktif ({activeUsers.length})
        </h2>
        <p className="text-gray-400">Menampilkan {activeUsers.length} pengguna aktif.</p>
      </section>
    </div>
  );
}