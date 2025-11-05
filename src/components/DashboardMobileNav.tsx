// src/components/DashboardMobileNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- Hook baru!

// Definisikan ikon-ikon
const IconHome = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const IconGrid = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const IconUser = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export default function DashboardMobileNav() {
  const pathname = usePathname(); // Untuk menandai link aktif

  return (
    // Bar navigasi bawah, hanya tampil di mobile (md:hidden)
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-lg z-50 border-t border-gray-800">
      <div className="container mx-auto px-4 h-16 flex justify-around items-center">

        {/* Link Transaksi */}
        <Link 
          href="/dashboard/user" 
          className={`flex flex-col items-center transition-colors ${
            pathname === '/dashboard/user' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <IconHome />
          <span className="text-xs mt-1">Transaksi</span>
        </Link>

        {/* Link Kategori */}
        <Link 
          href="/dashboard/categories" 
          className={`flex flex-col items-center transition-colors ${
            pathname === '/dashboard/categories' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <IconGrid />
          <span className="text-xs mt-1">Kategori</span>
        </Link>

        {/* Link Profil */}
        <Link 
          href="/dashboard/profile" 
          className={`flex flex-col items-center transition-colors ${
            pathname === '/dashboard/profile' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <IconUser />
          <span className="text-xs mt-1">Profil</span>
        </Link>

      </div>
    </nav>
  );
}