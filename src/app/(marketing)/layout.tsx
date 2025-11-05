// src/app/(marketing)/layout.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

// Ini adalah layout HANYA untuk grup (marketing)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Revisi dari Step 11:
        Margin bawah untuk nav mobile kita pindah ke sini
        agar hanya berlaku untuk marketing pages.
      */}
      <div className="mb-16 md:mb-0">
        <Navbar />
        {children}
        <Footer />
      </div>
      <MobileNav />
    </>
  );
}