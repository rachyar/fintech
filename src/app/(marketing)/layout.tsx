// src/app/(marketing)/layout.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav"; // <-- 1. Impor di sini

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 2. Tambahkan padding bawah di sini */}
      <div className="mb-16 md:mb-0"> 
        <Navbar />
        {children}
        <Footer />
      </div>
      <MobileNav /> {/* <-- 3. Render di sini */}
    </>
  );
}