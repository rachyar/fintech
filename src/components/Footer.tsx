// src/components/Footer.tsx
import Link from "next/link";

// Icon-icon SVG untuk media sosial
const IconGitHub = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.217.694.825.576C20.565 21.795 24 17.3 24 12 24 5.373 18.627 0 12 0z" clipRule="evenodd" />
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
              &copy; 2025 FintechApp - By RIFQI ACHYAR ❤️. Hak Cipta Dilindungi.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com/rachyar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-white transition-colors"
              >
                <IconGitHub />
              </a>
              <a 
                href="https://www.linkedin.com/in/rifqi-achyar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-white transition-colors"
              >
                <IconLinkedIn />
              </a>
              <a 
                href="https://www.facebook.com/rifqi.achyar.3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-white transition-colors"
              >
                <IconFacebook />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}