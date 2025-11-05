// src/components/CTA.tsx
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 p-8 sm:p-12">

          {/* Efek gradasi background tambahan */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Siap Mengubah Finansial Anda?
            </h2>
            <p className="mt-4 text-lg text-cyan-100 max-w-xl mx-auto">
              Mulai perjalanan Anda menuju kebebasan finansial hari ini. 
              Tidak perlu kartu kredit untuk mendaftar.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Daftar Sekarang, Gratis!
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}