// src/components/MobileNav.tsx

"use client"; // Diperlukan untuk <Link>

import Link from "next/link";

// Icon-icon SVG
const IconFeatures = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconPricing = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2 2zm0 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0-4a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const IconContact = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconStart = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function MobileNav() {
  return (
    // Bar navigasi bawah, hanya tampil di mobile (md:hidden)
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-lg z-50 border-t border-gray-800">
      <div className="container mx-auto px-4 h-16 flex justify-around items-center">

        {/* Link Fitur */}
        <Link href="#fitur" className="flex flex-col items-center text-gray-300 hover:text-cyan-400 transition-colors">
          <IconFeatures />
          <span className="text-xs mt-1">Fitur</span>
        </Link>

        {/* Link Harga */}
        <Link href="#harga" className="flex flex-col items-center text-gray-300 hover:text-cyan-400 transition-colors">
          <IconPricing />
          <span className="text-xs mt-1">Harga</span>
        </Link>

        {/* Link Kontak */}
        <Link href="#kontak" className="flex flex-col items-center text-gray-300 hover:text-cyan-400 transition-colors">
          <IconContact />
          <span className="text-xs mt-1">Kontak</span>
        </Link>

        {/* Link Mulai (CTA) */}
        <Link href="#" className="flex flex-col items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <IconStart />
          <span className="text-xs mt-1">Mulai</span>
        </Link>

      </div>
    </nav>
  );
}