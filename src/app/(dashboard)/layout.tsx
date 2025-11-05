// src/app/(dashboard)/layout.tsx

"use client"; // Diperlukan untuk router dan onClick

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import DashboardMobileNav from '@/components/DashboardMobileNav'; // <-- 1. IMPORT DI SINI

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      // Arahkan pengguna kembali ke halaman login
      router.push('/login');
    }
  };

  return (
    // 2. TAMBAHKAN PADDING BAWAH DI SINI (mb-16 md:mb-0)
    <div className="flex min-h-screen flex-col bg-gray-900 mb-16 md:mb-0">

      {/* Header Dashboard */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black shadow-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">

            {/* Navigasi Kiri */}
            <div className="flex items-center space-x-6">
                <Link href="/dashboard/user" className="text-xl font-bold text-white">
                  Fintech<span className="text-cyan-400">Dashboard</span>
                </Link>
                <nav className="hidden md:flex space-x-4">
                <Link href="/dashboard/user" className="text-sm text-gray-300 hover:text-white">
                    Transaksi
                </Link>
                <Link href="/dashboard/categories" className="text-sm text-gray-300 hover:text-white">
                    Kategori
                </Link>
                <Link href="/dashboard/profile" className="text-sm text-gray-300 hover:text-white">
                    Profil
                </Link>
                </nav>
            </div>

            {/* Tombol Logout Kanan */}
            <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
                Logout
            </button>
        </div>
      </header>

      {/* Konten Halaman (misal: /dashboard/user) */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* 3. RENDER NAVIGASI MOBILE BARU ANDA DI SINI */}
      <DashboardMobileNav />

    </div>
  );
}