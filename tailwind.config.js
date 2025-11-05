/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Mulai tambahkan kode baru di sini
      animation: {
        'blob-1': 'blob-1 12s linear infinite',
        'blob-2': 'blob-2 15s linear infinite',
      },
      keyframes: {
        'blob-1': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '50%': {
            transform: 'translate(80px, -40px) scale(1.3)',
          },
        },
        'blob-2': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '50%': {
            // Gerakan berlawanan untuk efek yang bagus
            transform: 'translate(-60px, 70px) scale(0.8)',
          },
        },
      },
      // Akhir kode baru
    },
  },
  plugins: [],
}