// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fintech App - Solusi Keuangan Modern",
  description: "Landing page untuk aplikasi fintech terbaik.",
};

// Ini adalah Root Layout yang bersih
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Body ini sekarang bersih, tanpa Navbar/Footer */}
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}