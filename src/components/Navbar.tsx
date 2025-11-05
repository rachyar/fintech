// src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/70 backdrop-blur-lg border-b border-gray-800 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Fintech<span className="text-cyan-400">App</span>
        </Link>

        {/* Navigation Links - Sembunyikan di mobile */}
        <div className="hidden md:flex space-x-6"> {/* <-- REVISI DI SINI */}
          <Link href="#fitur" className="text-gray-300 hover:text-white transition-colors">
            Fitur
          </Link>
          <Link href="#harga" className="text-gray-300 hover:text-white transition-colors">
            Harga
          </Link>
          <Link href="#kontak" className="text-gray-300 hover:text-white transition-colors">
            Kontak
          </Link>
        </div>

        {/* CTA Button - Sembunyikan di mobile */}
        <button className="hidden md:block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full transition-colors"> {/* <-- REVISI DI SINI */}
          Mulai Sekarang
        </button>

      </nav>
    </header>
  );
}