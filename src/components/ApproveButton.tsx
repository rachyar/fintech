// src/components/ApproveButton.tsx

"use client"; // Ini adalah Client Component

import { useState, useTransition } from 'react';
import { approveUser } from '@/app/actions'; // <-- Impor Server Action kita

export default function ApproveButton({ userId }: { userId: string }) {
  // 'useTransition' adalah cara React modern untuk menangani
  // status loading tanpa memblokir UI
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleApprove = () => {
    setMessage(null); // Reset pesan

    startTransition(async () => {
      const result = await approveUser(userId);

      if (!result.success) {
        setMessage(result.message || "Gagal melakukan approve.");
      }
      // Jika sukses, 'revalidatePath' di server action 
      // akan mengurus sisanya (UI akan refresh otomatis)
    });
  };

  return (
    <div>
      <button
        onClick={handleApprove}
        disabled={isPending} // Disable tombol saat loading
        className="font-medium text-cyan-400 hover:text-cyan-300 disabled:text-gray-500"
      >
        {isPending ? "Approving..." : "Approve"}
      </button>

      {message && (
        <p className="mt-1 text-xs text-red-400">{message}</p>
      )}
    </div>
  );
}