// src/components/Features.tsx

// Kita akan gunakan icon placeholder sederhana (SVG) untuk saat ini
// Icon untuk "Budgeting"
const IconBudget = () => (
  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

// Icon untuk "Tracking"
const IconTracking = () => (
  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" />
  </svg>
);

// Icon untuk "Investment"
const IconInvestment = () => (
  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Komponen Kartu Fitur (untuk menghindari duplikasi kode)
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700 shadow-lg">
    <div className="flex items-center space-x-4 mb-3">
      {icon}
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">
      {description}
    </p>
  </div>
);

// Komponen Utama
export default function Features() {
  return (
    <section id="fitur" className="relative z-10 py-20"> {/* Tambahkan id="fitur" di sini */}
      <div className="container mx-auto px-4">

        {/* Judul Section */}
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Semua yang Anda Butuhkan
        </h2>
        <p className="text-lg text-gray-400 text-center max-w-xl mx-auto mb-12">
          Dari melacak setiap rupiah hingga merencanakan masa depan, kami 
          menyediakan alat yang Anda butuhkan untuk sukses secara finansial.
        </p>

        {/* Grid 3-Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <FeatureCard 
            icon={<IconBudget />}
            title="Smart Budgeting"
            description="Buat anggaran yang realistis dengan kategori kustom dan lacak pengeluaran Anda secara real-time."
          />

          <FeatureCard 
            icon={<IconTracking />}
            title="Laporan Mendalam"
            description="Dapatkan wawasan visual tentang kebiasaan finansial Anda dengan laporan yang mudah dipahami."
          />

          <FeatureCard 
            icon={<IconInvestment />}
            title="Pantau Investasi"
            description="Hubungkan portofolio Anda dan lihat semua aset Anda bertumbuh di satu tempat terpusat."
          />

        </div>

      </div>
    </section>
  );
}