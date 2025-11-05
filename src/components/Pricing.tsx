// src/components/Pricing.tsx

// Icon centang (check)
const CheckIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default function Pricing() {
  return (
    <section id="harga" className="relative z-10 py-20"> {/* Tambahkan id="harga" di sini */}
      <div className="container mx-auto px-4">

        {/* Judul Section */}
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Harga Transparan untuk Anda
        </h2>
        <p className="text-lg text-gray-400 text-center max-w-xl mx-auto mb-12">
          Pilih paket yang paling sesuai dengan kebutuhan finansial Anda.
          Mulai gratis, upgrade kapan saja.
        </p>

        {/* Grid 3-Kolom untuk Harga */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Paket 1: Gratis */}
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg border border-gray-700 shadow-lg flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Gratis</h3>
            <p className="text-gray-400 mb-4">Untuk memulai</p>
            <p className="text-4xl font-bold text-white mb-6">
              Rp 0<span className="text-lg text-gray-400">/bulan</span>
            </p>
            <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Tracking Pengeluaran</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Budgeting Dasar</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Hubungkan 1 Akun Bank</span>
              </li>
            </ul>
            <button className="w-full border-2 border-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-colors">
              Mulai Gratis
            </button>
          </div>

          {/* Paket 2: Pro (Populer) */}
          <div className="bg-gray-900 p-8 rounded-lg border-2 border-cyan-400 shadow-2xl flex flex-col transform scale-105"> {/* Sorotan */}
            <span className="bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase self-start mb-4">
              Paling Populer
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-400 mb-4">Untuk pengguna serius</p>
            <p className="text-4xl font-bold text-white mb-6">
              Rp 49k<span className="text-lg text-gray-400">/bulan</span>
            </p>
            <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Semua di Paket Gratis</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Laporan Keuangan Mendalam</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Tracking Investasi</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Hubungkan Akun Tanpa Batas</span>
              </li>
            </ul>
            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-full transition-colors">
              Coba Pro Sekarang
            </button>
          </div>

          {/* Paket 3: Enterprise */}
          <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg border border-gray-700 shadow-lg flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-gray-400 mb-4">Untuk tim & bisnis</p>
            <p className="text-4xl font-bold text-white mb-6">
              Kustom
            </p>
            <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Semua di Paket Pro</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Manajemen Tim</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon />
                <span>Support Prioritas 24/7</span>
              </li>
            </ul>
            <button className="w-full border-2 border-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-colors">
              Hubungi Kami
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}