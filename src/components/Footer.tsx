// src/components/Footer.tsx
import Link from "next/link";

// Icon-icon SVG untuk media sosial
const IconTwitter = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const IconFacebook = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

export default function Footer() {
  return (
    // Kita letakkan ID "kontak" di sini
    <footer id="kontak" className="relative z-10 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">

        {/* Bagian Atas: Logo & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white mb-4 md:mb-0">
            Fintech<span className="text-cyan-400">App</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="#fitur" className="text-gray-400 hover:text-white transition-colors">
              Fitur
            </Link>
            <Link href="#harga" className="text-gray-400 hover:text-white transition-colors">
              Harga
            </Link>
            <Link href="#kontak" className="text-gray-400 hover:text-white transition-colors">
              Kontak
            </Link>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            {/* Copyright */}
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; 2025 FintechApp. Hak Cipta Dilindungi.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <IconTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <IconLinkedIn />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <IconFacebook />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}