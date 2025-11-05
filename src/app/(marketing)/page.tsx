// src/app/page.tsx

// Impor semua section yang telah kita buat
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";

export default function HomePage() {
  return (
    // 'main' sekarang hanya container. 
    // 'bg-black text-white' sudah dihapus dari sini (pindah ke layout.tsx)
    <main className="relative overflow-hidden">
      
      {/* ===== BACKGROUND ANIMASI ===== */}
      {/* Ini tetap ada di belakang semua section */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-500 opacity-30 blur-3xl filter animate-blob-1"
        ></div>
        <div 
          className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-purple-600 opacity-30 blur-3xl filter animate-blob-2"
        ></div>
      </div>
      
      {/* ===== HERO SECTION (Step 5) ===== */}
      <section className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Kelola Keuangan, <br />
            Buka <span className="text-cyan-400">Potensi</span> Anda.
          </h1>
          
          <p className="mt-6 text-lg text-gray-300 md:text-xl max-w-2xl mx-auto">
            Platform all-in-one untuk melacak pengeluaran, merencanakan anggaran, 
            dan berinvestasi dengan cerdas. Ambil kendali penuh atas finansial Anda.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Coba Gratis
            </button>
            <button 
              className="border-2 border-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
            >
              Lihat Demo
            </button>
          </div>

        </div>
      </section>
      
      {/* ===== FEATURES SECTION (Step 6) ===== */}
      <Features />
      
      {/* ===== CTA SECTION (Step 7) ===== */}
      <CTA />
      
      {/* ===== PRICING SECTION (Step 8) ===== */}
      <Pricing />
      
    </main>
  );
}